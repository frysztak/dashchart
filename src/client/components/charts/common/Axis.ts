import { Axis, AxisDataType, AxisPosition, AxisStyle, ChartData, ChartDimensions, ChartType } from './Props';
import { RefObject } from 'react';
import { Result } from 'shared/utils';
import { sequenceT } from 'fp-ts/es6/Apply';
import { either, Either, map } from 'fp-ts/es6/Either';
import { fold, none, Option, some } from 'fp-ts/es6/Option';
import { axisBottom, AxisDomain, axisLeft, axisRight, axisTop } from 'd3-axis';
import { select } from 'd3-selection';
import { Axis as D3Axis, AxisScale as D3AxisScale } from 'd3-axis';
import { genScaler, ScalerWrapper } from './Scaler';

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

export function getAxisScalers(chart: ChartData, type: ChartType, axisRanges: AxisRanges): Result<AxisScalers> {
  const scalers: Either<Error, [ScalerWrapper, ScalerWrapper]> = sequenceT(either)(
    genScaler(chart.x, axisRanges.x, type === ChartType.BAR_VERTICAL),
    genScaler(chart.y, axisRanges.y, type === ChartType.BAR_HORIZONTAL),
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

export type AxisFn = <Domain extends AxisDomain>(scale: D3AxisScale<Domain>) => D3Axis<Domain>;

export function genAxisFn(
  axis: Axis,
  axisOrientation: 'x' | 'y',
  dimensions: ChartDimensions,
): [AxisFn | null, string | null] {
  const { height, width, margin } = dimensions;

  switch (axisOrientation) {
    case 'x':
      switch (axis.position) {
        case AxisPosition.PRIMARY:
        case undefined:
          return [axisBottom, `translate(0, ${height - margin.bottom})`];
        case AxisPosition.SECONDARY:
          return [axisTop, `translate(0, ${margin.top})`];
        case AxisPosition.HIDDEN:
        default:
          return [null, null];
      }
    case 'y':
      switch (axis.position) {
        case AxisPosition.PRIMARY:
        case undefined:
          return [axisLeft, `translate(${margin.left}, 0)`];
        case AxisPosition.SECONDARY:
          return [axisRight, `translate(${width - margin.right}, 0)`];
        case AxisPosition.HIDDEN:
        default:
          return [null, null];
      }
  }
}

function applyAxisStyle<Domain extends AxisDomain>(axisFn: D3Axis<Domain>, style?: AxisStyle<Domain>): D3Axis<Domain> {
  if (!style) {
    return axisFn;
  }

  if (style.tickSize) {
    axisFn.tickSize(style.tickSize);
  }

  if (style.tickSizeInner) {
    axisFn.tickSizeInner(style.tickSizeInner);
  }

  if (style.tickSizeOuter) {
    axisFn.tickSizeOuter(style.tickSizeOuter);
  }

  if (style.tickPadding) {
    axisFn.tickPadding(style.tickPadding);
  }

  if (style.tickValues) {
    axisFn.tickValues(style.tickValues);
  }

  return axisFn;
}

export function drawAxis(
  ref: RefObject<SVGGElement | null>,
  axis: Axis,
  axisOrientation: 'x' | 'y',
  scalerWrapper: ScalerWrapper,
  dimensions: ChartDimensions,
): Option<string> {
  if (!ref || !ref.current) {
    return none;
  }

  select(ref.current)
    .selectAll('*')
    .remove();

  const [axisFn, axisTransform] = genAxisFn(axis, axisOrientation, dimensions);
  if (!axisFn) {
    return none;
  }

  switch (scalerWrapper.dataType) {
    case AxisDataType.DATE: {
      select(ref.current).call(applyAxisStyle(axisFn<Date>(scalerWrapper.scaler), axis.style as AxisStyle<Date>));
      break;
    }
    case AxisDataType.NUMBER: {
      select(ref.current).call(applyAxisStyle(axisFn(scalerWrapper.scaler), axis.style as AxisStyle<number>));
      break;
    }
    case AxisDataType.STRING: {
      select(ref.current).call(applyAxisStyle(axisFn(scalerWrapper.scaler), axis.style as AxisStyle<string>));
      break;
    }
  }

  return axisTransform ? some(axisTransform) : none;
}
