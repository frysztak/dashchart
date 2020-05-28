import { Result, Err } from '../utils';
import { DataFrame, Column, getColumn } from './DataFrame';

export interface ColumnId {
  dataFrameName: string;
  columnName: string;
}

export function formatColumnData(data?: ColumnId): string {
  return data ? `${data.dataFrameName}\$${data.columnName}` : '';
}

export function resolveColumnId(dataFrames: DataFrame[], id: ColumnId): Result<Column> {
  if (!dataFrames.length) {
    return Err('DataFrames list is empty.');
  }

  const dataFrame: DataFrame | undefined = dataFrames.find(df => df.name === id.dataFrameName);
  if (!dataFrame) {
    return Err(`DataFrame of name '${id.dataFrameName}' not found.`);
  }

  return getColumn(dataFrame, id.columnName);
}
