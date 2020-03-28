export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export enum AxisScale {
  LINEAR = 'LINEAR',
  LOG = 'LOG',
}

export enum AxisDataType {
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  STRING = 'STRING',
}

interface BaseAxis {
  scale: AxisScale;
}

export type Axis =
  | (BaseAxis & {
      dataType: AxisDataType.NUMBER;
      data: number[];
      domain?: [number, number];
    })
  | (BaseAxis & {
      dataType: AxisDataType.DATE;
      data: Date[];
      domain?: [Date, Date];
    })
  | (BaseAxis & {
      dataType: AxisDataType.STRING;
      data: string[];
      domain?: string[];
    });

export enum ChartType {
  LINE = 'LINE',
  SCATTER = 'SCATTER',
}

export interface ChartData {
  x: Axis;
  y: Axis;
}

export interface ChartProps {
  margin: ChartMargin;
  width: number;
  height: number;
  type: ChartType;
  data: ChartData;
}
