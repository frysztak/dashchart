import { Axis, AxisDataType, AxisPosition, AxisScale, AxisStyle, ChartData, ChartDimensions } from './ChartProps';
import {
  Axis as D3Axis,
  axisBottom,
  AxisDomain,
  axisLeft,
  axisRight,
  axisTop,
  curveMonotoneX,
  line,
  scaleLinear,
  ScaleLinear,
  scaleLog,
  ScaleLogarithmic,
  scaleOrdinal,
  ScaleOrdinal,
  scaleTime,
  ScaleTime,
  select,
} from 'd3';
import { AxisScale as D3AxisScale } from 'd3-axis';
import { RefObject } from 'react';
import { minmax, zip } from '../../../../shared/utils/utils';
import { Result, Err, Ok } from '../../utils';
import { pipe } from 'fp-ts/es6/pipeable';
import { chain, either, fromNullable, right } from 'fp-ts/es6/Either';
import { Option, none, some } from 'fp-ts/es6/Option';
import { AxisScalers } from './ChartCommon';
import { sequenceT } from 'fp-ts/es6/Apply';

export type ScalerWrapper =
  | {
      dataType: AxisDataType.NUMBER;
      scaler: ScaleLinear<number, number> | ScaleLogarithmic<number, number>;
    }
  | {
      dataType: AxisDataType.DATE;
      scaler: ScaleTime<number, number>;
    }
  | {
      dataType: AxisDataType.STRING;
      scaler: ScaleOrdinal<string, number>;
    };

export function genScaler(axis: Axis, range: [number, number]): Result<ScalerWrapper> {
  if (axis.scale === AxisScale.LOG) {
    if (axis.dataType === AxisDataType.STRING || axis.dataType === AxisDataType.DATE) {
      return Err(`Scale '${axis.scale}' is unsupported with data type '${axis.dataType}'.`);
    }
  }

  switch (axis.dataType) {
    case AxisDataType.NUMBER: {
      const domain: number[] = axis.domain || minmax(axis.data);
      const scale = axis.scale === AxisScale.LINEAR ? scaleLinear() : scaleLog();
      return Ok({ dataType: axis.dataType, scaler: scale.domain(domain).range(range) });
    }
    case AxisDataType.DATE: {
      const domain: Date[] = axis.domain || minmax(axis.data);
      return Ok({
        dataType: axis.dataType,
        scaler: scaleTime()
          .domain(domain)
          .range(range),
      });
    }
    case AxisDataType.STRING: {
      const domain: string[] = axis.domain || axis.data;
      return Ok({
        dataType: axis.dataType,
        scaler: scaleOrdinal<number>()
          .domain(domain)
          .range(genOrdinalRange(range, domain.length)),
      });
    }
  }
}

export function genOrdinalRange(axisRange: [number, number], length: number): number[] {
  const step: number = (axisRange[1] - axisRange[0]) / (length - 1);
  const [first, _] = axisRange;
  const range: number[] = [first];

  for (let i = 1; i < length; i++) {
    range.push(range[i - 1] + step);
  }

  return range;
}

function scaleAxis(wrapper: ScalerWrapper, axis: Axis): Result<number[]> {
  switch (wrapper.dataType) {
    case AxisDataType.NUMBER: {
      if (axis.dataType !== AxisDataType.NUMBER) {
        return Err(`Scaler received data of type '${axis.dataType}', but expected '${wrapper.dataType}'`);
      }
      return Ok(axis.data.map((v: number) => wrapper.scaler(v)));
    }
    case AxisDataType.DATE: {
      if (axis.dataType !== AxisDataType.DATE) {
        return Err(`Scaler received data of type '${axis.dataType}', but expected '${wrapper.dataType}'`);
      }
      return Ok(axis.data.map((v: Date) => wrapper.scaler(v)));
    }
    case AxisDataType.STRING: {
      if (axis.dataType !== AxisDataType.STRING) {
        return Err(`Scaler received data of type '${axis.dataType}', but expected '${wrapper.dataType}'`);
      }
      return Ok(axis.data.map((v: string) => wrapper.scaler(v)));
    }
  }
}

function checkArrayLengths(axes: ChartData): Result<ChartData> {
  if (axes.x.data.length !== axes.y.data.length) {
    return Err(`Array lengths don't match (${axes.x.data.length} vs ${axes.y.data.length})`);
  }
  return Ok(axes);
}

function generateScaledAxes([axes, axisScalers]: [ChartData, AxisScalers]): Result<[number[], number[]]> {
  return sequenceT(either)(scaleAxis(axisScalers.x, axes.x), scaleAxis(axisScalers.y, axes.y));
}

function generateSvgPath([x, y]: [number[], number[]]): Result<string> {
  return fromNullable(Error('Line generator returned null'))(
    line()
      .x((_, i) => x[i])
      .y((_, i) => y[i])
      .curve(curveMonotoneX)(Array(x.length)),
  );
}

export function genPath(axes: ChartData, axisScalers: Result<AxisScalers>): Result<string> {
  const scaledAxes: Result<[number[], number[]]> = chain(generateScaledAxes)(
    sequenceT(either)(chain(checkArrayLengths)(right(axes)), axisScalers),
  );

  return pipe(scaledAxes, chain(generateSvgPath));
}

export type PointCoords = [number, number][];

function generateScatterPoints([x, y]: [number[], number[]]): Result<PointCoords> {
  return Ok(zip(x, y));
}

export function genPoints(axes: ChartData, axisScalers: Result<AxisScalers>): Result<PointCoords> {
  const scaledAxes: Result<[number[], number[]]> = chain(generateScaledAxes)(
    sequenceT(either)(chain(checkArrayLengths)(right(axes)), axisScalers),
  );

  return pipe(scaledAxes, chain(generateScatterPoints));
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
    case AxisDataType.DATE:
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
