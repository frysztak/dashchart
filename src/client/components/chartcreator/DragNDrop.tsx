export interface DraggedColumnData {
  dataFrameName: string;
  columnName: string;
}

export function formatColumnData(data?: DraggedColumnData): string {
  return data ? `${data.dataFrameName}\$${data.columnName}` : '';
}
