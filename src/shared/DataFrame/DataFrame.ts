import produce, { Draft } from 'immer';
import { Dictionary, isNumeric } from '../utils';

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

export class DataFrame {
  private _name: string;
  private _columns: Map<string, Column>;

  constructor(name?: string, data?: Dictionary<Column>) {
    this._name = name || '';

    if (data) {
      this._columns = new Map<string, Column>();
      this._columns = produce(this._columns, (draft: Draft<Map<string, Column>>) => {
        for (const [colName, column] of Object.entries(data)) {
          draft.set(colName, column);
        }
      });
    } else {
      this._columns = new Map<string, Column>();
    }
  }

  name(): string {
    return this._name;
  }

  setName(newName: string) {
    this._name = newName;
  }

  createColumn(columnName: string, type: ColumnType = ColumnType.STRING) {
    this._columns = produce(this._columns, (draft: Draft<Map<string, Column>>) => {
      if (!draft.has(columnName)) {
        draft.set(columnName, { type: type, values: [] });
      }
    });
  }

  createColumns(columnNames: string[]) {
    for (const columnName of columnNames) {
      this.createColumn(columnName);
    }
  }

  push(values: string[]) {
    this._columns = produce(this._columns, (draft: Draft<Map<string, Column>>) => {
      let idx = 0;
      for (const column of draft.values()) {
        if (column.type === ColumnType.STRING) {
          column.values = [...column.values, values[idx]];
        }
        idx++;
      }
    });
  }

  column(name: string): Readonly<Column> | null {
    return this._columns.has(name) ? this._columns.get(name)! : null;
  }

  columnNames(): string[] {
    return Array.from(this._columns.keys());
  }

  inferColumnType(columnName: string) {
    const column: Readonly<Column> | null = this.column(columnName);
    if (!column) {
      return;
    }

    if (column.type === ColumnType.NUMBER) {
      // number is already specific enough
      return;
    }

    const isNumber: boolean = column.values.every((value: string) => isNumeric(value));
    this._columns = produce(this._columns, (draft: Draft<Map<string, Column>>) => {
      draft.get(columnName)!.inferredType = isNumber ? ColumnType.NUMBER : ColumnType.STRING;
    });
  }

  inferColumnTypes() {
    for (const columnName of this._columns.keys()) {
      this.inferColumnType(columnName);
    }
  }

  convertColumn(columnName: string, desiredType: ColumnType) {
    const column: Readonly<Column> | null = this.column(columnName);
    if (!column) {
      throw new Error(`Column '${columnName}' doesn't exist in DataFrame.`);
    }

    if (desiredType !== ColumnType.STRING && column.inferredType !== desiredType) {
      throw new Error(`Column '${columnName}' cannot be converted to type ${desiredType.toString()}`);
    }

    this._columns = produce(this._columns, (draft: Draft<Map<string, Column>>) => {
      let newValues: any[];
      if (column.type === ColumnType.STRING && desiredType === ColumnType.NUMBER) {
        newValues = column.values.map((v: string) => parseFloat(v));
      } else if (column.type === ColumnType.NUMBER && desiredType === ColumnType.STRING) {
        newValues = column.values.map((v: number) => v.toString(10));
      } else {
        throw new Error(`Incorrect state.`);
      }

      draft.set(columnName, {
        ...column,
        values: newValues,
        type: desiredType,
      });
    });
  }
}
