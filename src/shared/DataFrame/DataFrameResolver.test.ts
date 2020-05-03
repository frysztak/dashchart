import { resolveColumnId } from './DataFrameResolver';
import { Column, ColumnType, DataFrame } from './DataFrame';
import { Result } from '../utils/Result';
import { isLeft, isRight, Right } from 'fp-ts/es6/Either';
import { enableMapSet } from 'immer';

describe('DataFrameResolver', () => {
  beforeAll(() => {
    enableMapSet();
  });

  it('fails with empty DF list', () => {
    const result: Result<Column> = resolveColumnId([], { dataFrameName: 'df', columnName: 'col1' });
    expect(isLeft(result)).toBe(true);
  });

  it("fails when column doesn't exist", () => {
    const df = new DataFrame('df', {
      col1: { type: ColumnType.NUMBER, values: [1, 2, 3] },
    });
    const result: Result<Column> = resolveColumnId([df], { dataFrameName: 'df', columnName: 'col2' });
    expect(isLeft(result)).toBe(true);
  });

  it('succeeds when column and DF match', () => {
    const df = new DataFrame('df', {
      col1: { type: ColumnType.NUMBER, values: [1, 2, 3] },
    });
    const result: Result<Column> = resolveColumnId([df], { dataFrameName: 'df', columnName: 'col1' });
    expect(isRight(result)).toBe(true);
    const column: Column = (result as Right<Column>).right;
    expect(column.type).toEqual(ColumnType.NUMBER);
    expect(column.values).toEqual([1, 2, 3]);
  });
});
