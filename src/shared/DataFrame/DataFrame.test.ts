import {
  columnNames,
  ColumnType,
  DataFrame,
  inferColumnTypes,
  renameDataFrame,
  getColumn,
  convertColumn,
  Column,
  convertToDataTable,
} from './DataFrame';
import { takeRight, Result } from '../utils';
import { isRight } from 'fp-ts/es6/Either';

describe('DataFrame', () => {
  let frame: DataFrame;

  beforeEach(() => {
    frame = {
      id: 1,
      name: 'My DF',
      columns: {
        id: {
          type: ColumnType.STRING,
          values: ['1', '2', '3', '4', '5'],
        },
        first_name: {
          type: ColumnType.STRING,
          values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay'],
        },
        last_name: {
          type: ColumnType.STRING,
          values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
        },
        email: {
          type: ColumnType.STRING,
          values: [
            'ppassey0@amazonaws.com',
            'bdocker1@pagesperso-orange.fr',
            'tfantini2@reference.com',
            'ffreak3@google.nl',
            'gcutchee4@ifeng.com',
          ],
        },
        numbers: {
          type: ColumnType.NUMBER,
          values: [10, 20, 30, 40, 50],
        },
      },
    };
  });

  test('returns name of DF', () => {
    const name: string = frame.name;
    expect(name).toEqual('My DF');
  });

  test('renames DF', () => {
    const df: DataFrame = renameDataFrame(frame, 'My new DF');
    const name: string = df.name;
    expect(name).toEqual('My new DF');
  });

  test('returns name of columns', () => {
    const names: string[] = columnNames(frame);
    expect(names).toEqual(['id', 'first_name', 'last_name', 'email', 'numbers']);
  });

  test('infers type of numeric columns', () => {
    const df: DataFrame = inferColumnTypes(frame);
    expect(takeRight(getColumn(df, 'id')).inferredType).toEqual(ColumnType.NUMBER);
    expect(takeRight(getColumn(df, 'first_name')).inferredType).toEqual(ColumnType.STRING);
    expect(takeRight(getColumn(df, 'last_name')).inferredType).toEqual(ColumnType.STRING);
    expect(takeRight(getColumn(df, 'email')).inferredType).toEqual(ColumnType.STRING);
  });

  test('converts strings to numbers', () => {
    let df: DataFrame = inferColumnTypes(frame);
    const result: Result<DataFrame> = convertColumn(df, 'id', ColumnType.NUMBER);

    expect(isRight(result)).toBe(true);
    df = takeRight(result);

    const columnR = getColumn(df, 'id');
    expect(isRight(columnR)).toBe(true);

    const column: Column = takeRight(columnR);
    expect(column.type).toEqual(ColumnType.NUMBER);
    expect(column.inferredType).toEqual(ColumnType.NUMBER);
    expect(column.values).toEqual([1, 2, 3, 4, 5]);
  });

  test('converts numbers to strings', () => {
    const result: Result<DataFrame> = convertColumn(frame, 'numbers', ColumnType.STRING);
    expect(isRight(result)).toBe(true);
    const df: DataFrame = takeRight(result);

    const columnR = getColumn(df, 'numbers');
    expect(isRight(columnR)).toBe(true);

    const column: Column = takeRight(columnR);
    expect(column.values).toEqual(['10', '20', '30', '40', '50']);
  });

  describe('convertToDataTable', () => {
    test('works with regular Data Frame', () => {
      const [columns, rows] = convertToDataTable(frame);
      expect(columns).toEqual([
        { name: 'id', selector: 'id' },
        { name: 'first_name', selector: 'first_name' },
        { name: 'last_name', selector: 'last_name' },
        { name: 'email', selector: 'email' },
        { name: 'numbers', selector: 'numbers' },
      ]);
      expect(rows).toEqual([
        {
          __id: 0,
          id: '1',
          first_name: 'Prentiss',
          last_name: 'Passey',
          email: 'ppassey0@amazonaws.com',
          numbers: 10,
        },
        {
          __id: 1,
          id: '2',
          first_name: 'Bessie',
          last_name: 'Docker',
          email: 'bdocker1@pagesperso-orange.fr',
          numbers: 20,
        },
        {
          __id: 2,
          id: '3',
          first_name: 'Tybi',
          last_name: 'Fantini',
          email: 'tfantini2@reference.com',
          numbers: 30,
        },
        {
          __id: 3,
          id: '4',
          first_name: 'Felix',
          last_name: 'Freak',
          email: 'ffreak3@google.nl',
          numbers: 40,
        },
        {
          __id: 4,
          id: '5',
          first_name: 'Gay',
          last_name: 'Cutchee',
          email: 'gcutchee4@ifeng.com',
          numbers: 50,
        },
      ]);
    });

    test('works with empty Data Frame', () => {
      const [columns, rows] = convertToDataTable({
        id: 1,
        name: '',
        columns: {},
      });

      expect(columns).toEqual([]);
      expect(rows).toEqual([]);
    });
  });
});
