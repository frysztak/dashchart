export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export enum ChartAxisScale {
  LINEAR = 'LINEAR',
  LOG = 'LOG',
}

export enum ChartAxisDataType {
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  STRING = 'STRING',
}

interface ChartBaseAxis {
  scale: ChartAxisScale;
}

export type ChartAxis =
  | (ChartBaseAxis & {
      dataType: ChartAxisDataType.NUMBER;
      data: number[];
      domain?: [number, number];
    })
  | (ChartBaseAxis & {
      dataType: ChartAxisDataType.DATE;
      data: Date[];
      domain?: [Date, Date];
    })
  | (ChartBaseAxis & {
      dataType: ChartAxisDataType.STRING;
      data: string[];
      domain?: string[];
    });

export enum ChartType {
  LINEAR = 'LINEAR',
  SCATTER = 'SCATTER',
}

export interface ChartData {
  x: ChartAxis;
  y: ChartAxis;
  type: ChartType;
}

export interface ChartProps {
  margin: ChartMargin;
  width: number;
  height: number;
  data: ChartData[];
}
