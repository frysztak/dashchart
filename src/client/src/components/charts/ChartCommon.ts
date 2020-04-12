import { ChartData, ChartDimensions } from './ChartProps';
import { drawAxis, genScaler, ScalerWrapper } from './ChartGenerators';
import { RefObject } from 'react';
import { Result } from '../../utils';
import { sequenceT } from 'fp-ts/es6/Apply';
import { either, Either, map } from 'fp-ts/es6/Either';
import { Option, fold } from 'fp-ts/es6/Option';

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

export function getAxisScalers(chart: ChartData, axisRanges: AxisRanges): Result<AxisScalers> {
  const scalers: Either<Error, [ScalerWrapper, ScalerWrapper]> = sequenceT(either)(
    genScaler(chart.x, axisRanges.x),
    genScaler(chart.y, axisRanges.y),
  );
  return map(
    ([xScaler, yScaler]: [ScalerWrapper, ScalerWrapper]): AxisScalers => ({
      x: xScaler,
      y: yScaler,
    }),
  )(scalers);
}

export interface AxesTransforms {
  x: string;
  y: string;
}

export function getAxisTransforms(
  xAxisRef: RefObject<SVGGElement | null>,
  yAxisRef: RefObject<SVGGElement | null>,
  chart: ChartData,
  scalers: Result<AxisScalers>,
  dimensions: ChartDimensions,
): Result<AxesTransforms> {
  const mapAxisTransform = (transform: Option<string>): string =>
    fold(
      () => '',
      (a: string) => a,
    )(transform);

  return map((okScalers: AxisScalers) => ({
    x: mapAxisTransform(drawAxis(xAxisRef, chart.x, 'x', okScalers.x, dimensions)),
    y: mapAxisTransform(drawAxis(yAxisRef, chart.y, 'y', okScalers.y, dimensions)),
  }))(scalers);
}
