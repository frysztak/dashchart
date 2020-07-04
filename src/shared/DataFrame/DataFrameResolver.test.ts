import { resolveColumnId } from './DataFrameResolver';
import { Column, ColumnType, DataFrame } from './DataFrame';
import { Result } from '../utils';
import { isLeft, isRight, Right } from 'fp-ts/es6/Either';

describe('DataFrameResolver', () => {
  it('fails with empty DF list', () => {
    const result: Result<Column> = resolveColumnId([], { dataFrameId: 1, dataFrameName: 'My DF', columnName: 'col1' });
    expect(isLeft(result)).toBe(true);
  });

  it("fails when column doesn't exist", () => {
    const df: DataFrame = {
      id: 1,
      name: 'df',
      columns: {
        col1: { type: ColumnType.NUMBER, values: [1, 2, 3] },
      },
    };
    const result: Result<Column> = resolveColumnId([df], {
      dataFrameId: 1,
      dataFrameName: 'My DF',
      columnName: 'col2',
    });
    expect(isLeft(result)).toBe(true);
  });

  it('succeeds when column and DF match', () => {
    const df: DataFrame = {
      id: 1,
      name: 'df',
      columns: {
        col1: { type: ColumnType.NUMBER, values: [1, 2, 3] },
      },
    };
    const result: Result<Column> = resolveColumnId([df], {
      dataFrameId: 1,
      dataFrameName: 'My DF',
      columnName: 'col1',
    });
    expect(isRight(result)).toBe(true);
    const column: Column = (result as Right<Column>).right;
    expect(column.type).toEqual(ColumnType.NUMBER);
    expect(column.values).toEqual([1, 2, 3]);
  });
});
