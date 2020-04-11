import { ChartData, ChartDimensions } from './ChartProps';
import { drawAxis, genScaler, ScalerWrapper } from './ChartGenerators';
import { RefObject } from 'react';

export type AxisRange = [number, number];
export interface AxisRanges {
  x: AxisRange;
  y: AxisRange;
}

export function getRanges(dimensions: ChartDimensions): AxisRanges {
  const { width, height, margin } = dimensions;

  return {
    x: [margin.left, width - margin.right],
    y: [height - margin.bottom, margin.top],
  };
}

export interface AxisScalers {
  x: ScalerWrapper;
  y: ScalerWrapper;
}

export function getAxisScalers(chart: ChartData, axisRanges: AxisRanges): AxisScalers {
  return {
    x: genScaler(chart.x, axisRanges.x),
    y: genScaler(chart.y, axisRanges.y),
  };
}

export interface AxesTransforms {
  x: string;
  y: string;
}

export function getAxisTransforms(
  xAxisRef: RefObject<SVGGElement | null>,
  yAxisRef: RefObject<SVGGElement | null>,
  chart: ChartData,
  scalers: AxisScalers,
  dimensions: ChartDimensions,
): AxesTransforms {
  return {
    x: drawAxis(xAxisRef, chart.x, 'x', scalers.x, dimensions),
    y: drawAxis(yAxisRef, chart.y, 'y', scalers.y, dimensions),
  };
}
