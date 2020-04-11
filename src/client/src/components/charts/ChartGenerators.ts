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

export function genScaler(axis: Axis, range: [number, number]): ScalerWrapper {
  if (axis.scale === AxisScale.LOG) {
    if (axis.dataType === AxisDataType.STRING || axis.dataType === AxisDataType.DATE) {
      throw new Error(`Scale '${axis.scale}' is unsupported with data type '${axis.dataType}'.`);
    }
  }

  switch (axis.dataType) {
    case AxisDataType.NUMBER: {
      const domain: number[] = axis.domain || minmax(axis.data);
      const scale = axis.scale === AxisScale.LINEAR ? scaleLinear() : scaleLog();
      return { dataType: axis.dataType, scaler: scale.domain(domain).range(range) };
    }
    case AxisDataType.DATE: {
      const domain: Date[] = axis.domain || minmax(axis.data);
      return {
        dataType: axis.dataType,
        scaler: scaleTime()
          .domain(domain)
          .range(range),
      };
    }
    case AxisDataType.STRING: {
      const domain: string[] = axis.domain || axis.data;
      return {
        dataType: axis.dataType,
        scaler: scaleOrdinal<number>()
          .domain(domain)
          .range(genOrdinalRange(range, domain.length)),
      };
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

export type ScalerCallbacks = {
  [AxisDataType.NUMBER]: (
    scaler: ScaleLinear<number, number> | ScaleLogarithmic<number, number>,
    data: number[],
  ) => void;
  [AxisDataType.DATE]: (scaler: ScaleTime<number, number>, data: Date[]) => void;
  [AxisDataType.STRING]: (scaler: ScaleOrdinal<string, number>, data: string[]) => void;
};

function applyFuncOnScaler(scaler: ScalerWrapper, axis: Axis, callbacks: ScalerCallbacks) {
  switch (scaler.dataType) {
    case AxisDataType.NUMBER: {
      if (axis.dataType !== AxisDataType.NUMBER) {
        throw new Error(`Scaler received data of type '${axis.dataType}', but expected '${scaler.dataType}'`);
      }
      return callbacks[AxisDataType.NUMBER](scaler.scaler, axis.data);
    }
    case AxisDataType.DATE: {
      if (axis.dataType !== AxisDataType.DATE) {
        throw new Error(`Scaler received data of type '${axis.dataType}', but expected '${scaler.dataType}'`);
      }
      return callbacks[AxisDataType.DATE](scaler.scaler, axis.data);
    }
    case AxisDataType.STRING: {
      if (axis.dataType !== AxisDataType.STRING) {
        throw new Error(`Scaler received data of type '${axis.dataType}', but expected '${scaler.dataType}'`);
      }
      return callbacks[AxisDataType.STRING](scaler.scaler, axis.data);
    }
  }
}

export function genPath(axes: ChartData, xScaler: ScalerWrapper, yScaler: ScalerWrapper): string {
  if (axes.x.data.length !== axes.y.data.length) {
    throw new Error(`Array lengths don't match (${axes.x.data.length} vs ${axes.y.data.length})`);
  }

  let lineGenerator = line();
  const scalerCallbacks = (axis: 'x' | 'y'): ScalerCallbacks => ({
    [AxisDataType.NUMBER]: (scaler: ScaleLinear<number, number> | ScaleLogarithmic<number, number>, data: number[]) =>
      (lineGenerator =
        axis === 'x'
          ? lineGenerator.x((_, i: number) => scaler(data[i]))
          : lineGenerator.y((_, i: number) => scaler(data[i]))),
    [AxisDataType.DATE]: (scaler: ScaleTime<number, number>, data: Date[]) =>
      (lineGenerator =
        axis === 'x'
          ? lineGenerator.x((_, i: number) => scaler(data[i]))
          : lineGenerator.y((_, i: number) => scaler(data[i]))),
    [AxisDataType.STRING]: (scaler: ScaleOrdinal<string, number>, data: string[]) =>
      (lineGenerator =
        axis === 'x'
          ? lineGenerator.x((_, i: number) => scaler(data[i]))
          : lineGenerator.y((_, i: number) => scaler(data[i]))),
  });
  applyFuncOnScaler(xScaler, axes.x, scalerCallbacks('x'));
  applyFuncOnScaler(yScaler, axes.y, scalerCallbacks('y'));

  return lineGenerator.curve(curveMonotoneX)(Array(axes.x.data.length))!;
}

export type PointCoords = [number, number][];

export function genPoints(axes: ChartData, xScaler: ScalerWrapper, yScaler: ScalerWrapper): PointCoords {
  if (axes.x.data.length !== axes.y.data.length) {
    throw new Error(`Array lengths don't match (${axes.x.data.length} vs ${axes.y.data.length})`);
  }

  let x: number[] = [];
  let y: number[] = [];

  const scalerCallbacks = (axis: 'x' | 'y'): ScalerCallbacks => ({
    [AxisDataType.NUMBER]: (scaler: ScaleLinear<number, number> | ScaleLogarithmic<number, number>, data: number[]) =>
      axis === 'x' ? (x = data.map((v: number) => scaler(v))) : (y = data.map((v: number) => scaler(v))),
    [AxisDataType.DATE]: (scaler: ScaleTime<number, number>, data: Date[]) =>
      axis === 'x' ? (x = data.map((v: Date) => scaler(v))) : (y = data.map((v: Date) => scaler(v))),
    [AxisDataType.STRING]: (scaler: ScaleOrdinal<string, number>, data: string[]) =>
      axis === 'x' ? (x = data.map((v: string) => scaler(v))) : (y = data.map((v: string) => scaler(v))),
  });

  applyFuncOnScaler(xScaler, axes.x, scalerCallbacks('x'));
  applyFuncOnScaler(yScaler, axes.y, scalerCallbacks('y'));

  return zip(x, y);
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
): string {
  if (!ref || !ref.current) {
    return '';
  }

  select(ref.current)
    .selectAll('*')
    .remove();

  const [axisFn, axisTransform] = genAxisFn(axis, axisOrientation, dimensions);
  if (!axisFn) {
    return '';
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

  return axisTransform || '';
}
