import { DistributivePick } from 'shared/utils/Types';

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

export const AxisScaleMap: Record<AxisScale, string> = {
  [AxisScale.LINEAR]: 'Linear',
  [AxisScale.LOG]: 'Log',
};

export enum AxisDataType {
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  STRING = 'STRING',
}

export enum AxisPosition {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  HIDDEN = 'HIDDEN',
}

export interface AxisStyle<Domain> {
  tickSize: number;
  tickSizeInner?: number;
  tickSizeOuter?: number;
  tickPadding: number;
  tickValues?: Domain[];

  barPadding: number;
}

interface BaseAxis {
  scale: AxisScale;
  position: AxisPosition;
}

export type Axis =
  | (BaseAxis & {
      dataType: AxisDataType.NUMBER;
      data: number[];
      domain?: [number, number];
      style: AxisStyle<number>;
    })
  | (BaseAxis & {
      dataType: AxisDataType.DATE;
      data: Date[];
      domain?: [Date, Date];
      style: AxisStyle<Date>;
    })
  | (BaseAxis & {
      dataType: AxisDataType.STRING;
      data: string[];
      domain?: string[];
      style: AxisStyle<string>;
    });

export enum ChartType {
  AXIS_ONLY = 'AXIS_ONLY',
  LINE = 'LINE',
  SCATTER = 'SCATTER',
  BAR_VERTICAL = 'BAR_VERTICAL',
  BAR_HORIZONTAL = 'BAR_HORIZONTAL',
}

export const ChartTypeMap: Record<ChartType, string> = {
  [ChartType.LINE]: 'Line',
  [ChartType.SCATTER]: 'Scatter',
  [ChartType.BAR_HORIZONTAL]: 'Bar Horizontal',
  [ChartType.BAR_VERTICAL]: 'Bar Vertical',
  [ChartType.AXIS_ONLY]: 'Axis Only',
};

export interface ChartData {
  x: Axis;
  y: Axis;
}

export interface ChartDimensions {
  margin: ChartMargin;
  width: number;
  height: number;
}

export interface ChartProps {
  dimensions: ChartDimensions;
  type: ChartType;
  data: ChartData;
}

export type PositionalAxisData = DistributivePick<Axis, 'position' | 'dataType' | 'data'>;
export type PositionalChartData = {
  x: PositionalAxisData;
  y: PositionalAxisData;
};

type UserEditableAxisProps = DistributivePick<Axis, 'scale' | 'style' | 'domain'>;
export type UserEditableChartProps = Omit<ChartProps, 'data'> & {
  data: {
    x: UserEditableAxisProps;
    y: UserEditableAxisProps;
  };
};
