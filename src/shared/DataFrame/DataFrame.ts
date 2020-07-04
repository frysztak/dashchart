import produce from 'immer';
import { Err, isNumeric, Result, Ok, DistributivePick, Dictionary } from '../utils';
import { pipe } from 'fp-ts/es6/pipeable';
import { filterOrElse, chain, fold } from 'fp-ts/es6/Either';

export enum ColumnType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
}

interface BaseColumn {
  inferredType?: ColumnType;
}

export type Column =
  | (BaseColumn & {
      type: ColumnType.NUMBER;
      values: number[];
    })
  | (BaseColumn & {
      type: ColumnType.STRING;
      values: string[];
    });

export interface DataFrame {
  id: number;
  name: string;
  columns: Record<string, Column>;
}

export function renameDataFrame(df: DataFrame, newName: string): DataFrame {
  return produce(df, draft => {
    draft.name = newName;
  });
}

export function hasColumn(df: DataFrame, columnName: string): boolean {
  return Object.keys(df.columns).includes(columnName);
}

export function getColumn(df: DataFrame, columnName: string): Result<Column> {
  return hasColumn(df, columnName)
    ? Ok(df.columns[columnName])
    : Err(`DataFrame ${df.name} doesn't have column ${columnName}`);
}

export function getColumns(df: DataFrame): Array<[string, Column]> {
  return Array.from(Object.entries(df.columns));
}

export function createColumn(df: DataFrame, columnName: string, column: Column): Result<DataFrame> {
  if (hasColumn(df, columnName)) {
    return Err(`Column ${columnName} already exists`);
  }

  return Ok(
    produce(df, draft => {
      draft.columns[columnName] = column;
    }),
  );
}

export function createColumns(df: DataFrame, columnNames: string[]): Result<DataFrame> {
  return columnNames.reduce(
    (acc: Result<DataFrame>, colName: string) =>
      fold(
        (err: Error) => Err(err.message),
        (dff: DataFrame) => createColumn(dff, colName, { type: ColumnType.STRING, values: [] }),
      )(acc),
    Ok(df),
  );
}

export function columnNames(df: DataFrame): string[] {
  return Array.from(Object.keys(df.columns));
}

function inferColumnType(column: Column): ColumnType {
  if (column.type === ColumnType.NUMBER) {
    // number is already specific enough
    return ColumnType.NUMBER;
  }

  const isNumber: boolean = column.values.every((value: string) => isNumeric(value));
  return isNumber ? ColumnType.NUMBER : ColumnType.STRING;
}

export function inferColumnTypes(df: DataFrame): DataFrame {
  return produce(df, draft => {
    for (const column of Object.values(draft.columns)) {
      column.inferredType = inferColumnType(column);
    }
  });
}

type ColumnValues = DistributivePick<Column, 'type' | 'values'>;
const convertColumnValues = (desiredType: ColumnType) => (col: Column): Result<ColumnValues> => {
  if (col.type === ColumnType.STRING) {
    if (desiredType === ColumnType.NUMBER) {
      return Ok({
        type: desiredType,
        values: col.values.map((v: string) => parseFloat(v)),
      });
    }
  }

  if (col.type === ColumnType.NUMBER) {
    if (desiredType === ColumnType.STRING) {
      return Ok({
        type: desiredType,
        values: col.values.map((v: number) => v.toString(10)),
      });
    }
  }

  return Err(`Unsupported column conversion from '${col.type}' to '${desiredType}'`);
};

export function convertColumn(df: DataFrame, columnName: string, desiredType: ColumnType): Result<DataFrame> {
  const replaceColumn = ({ type, values }: ColumnValues): Result<DataFrame> =>
    Ok(
      produce(df, draft => {
        draft.columns[columnName].type = type;
        draft.columns[columnName].values = values;
      }),
    );

  const column: Result<Column> = getColumn(df, columnName);
  return pipe(
    column,
    filterOrElse(
      (col: Column) => desiredType === ColumnType.STRING || col.inferredType === desiredType,
      _ => new Error(`Column '${columnName}' cannot be converted to type ${desiredType.toString()}`),
    ),
    chain(convertColumnValues(desiredType)),
    chain(replaceColumn),
  );
}

export function pushValues(df: DataFrame, values: string[]): DataFrame {
  return produce(df, draft => {
    let idx = 0;
    for (const column of Object.values(draft.columns)) {
      if (column.type === ColumnType.STRING) {
        column.values = [...column.values, values[idx]];
      }
      idx++;
    }
  });
}

export type TableColumn = {
  name: string;
};

type TableRow = {
  __id: number;
} & Dictionary<string | number>;

export function convertToDataTable(df: DataFrame): [TableColumn[], TableRow[]] {
  const dfColumns: Array<[string, Column]> = getColumns(df);
  const columns: TableColumn[] = dfColumns.map(([columnName, _]) => ({
    name: columnName,
    selector: columnName,
  }));

  const nRows: number = Math.min(...dfColumns.map(([_, col]) => col.values.length));
  const rows: TableRow[] = isFinite(nRows)
    ? [...Array(nRows)].map((_, rowIdx: number) => {
        return {
          __id: rowIdx,
          ...dfColumns.reduce(
            (acc, [colName, col]) => ({
              ...acc,
              [colName]: col.values[rowIdx],
            }),
            {},
          ),
        };
      })
    : [];

  return [columns, rows];
}
