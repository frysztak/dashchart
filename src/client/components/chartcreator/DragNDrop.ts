export enum DropZoneLocation {
  LEFT = 'LEFT',
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
}

export type DropZoneValues<T> = Partial<Record<DropZoneLocation, T>>;

export function isHorizontal(location: DropZoneLocation): boolean {
  return location === DropZoneLocation.TOP || location === DropZoneLocation.BOTTOM;
}

export interface DraggedColumnData {
  dataFrameName: string;
  columnName: string;
}

export function formatColumnData(data?: DraggedColumnData): string {
  return data ? `${data.dataFrameName}\$${data.columnName}` : '';
}
