import { Axis, AxisDataType, AxisPosition, AxisScale, ChartData, ChartDimensions } from './ChartProps';
import {
  Axis as D3Axis,
  axisBottom,
  AxisDomain,
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
  axisTop,
  axisRight,
  axisLeft,
  select,
} from 'd3';
import { minmax } from '../../../../shared/utils/utils';
import { AxisScale as D3AxisScale } from 'd3-axis';

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

export function genPath(data: ChartData, xScaler: ScalerWrapper, yScaler: ScalerWrapper): string {
  const x: number[] | Date[] | string[] = data.x.data;
  const y: number[] | Date[] | string[] = data.y.data;

  if (x.length !== x.length) {
    throw new Error(`Array lengths don't match (${x.length} vs ${y.length})`);
  }

  let lineGenerator = line();

  switch (xScaler.dataType) {
    case AxisDataType.NUMBER:
    case AxisDataType.DATE: {
      lineGenerator = lineGenerator.x((_, i: number) => xScaler.scaler(x[i] as number));
      break;
    }
    case AxisDataType.STRING: {
      lineGenerator = lineGenerator.x((_, i: number) => xScaler.scaler(x[i] as string));
      break;
    }
  }

  switch (yScaler.dataType) {
    case AxisDataType.NUMBER:
    case AxisDataType.DATE: {
      lineGenerator = lineGenerator.y((_, i: number) => yScaler.scaler(y[i] as number));
      break;
    }
    case AxisDataType.STRING: {
      lineGenerator = lineGenerator.y((_, i: number) => yScaler.scaler(y[i] as string));
      break;
    }
  }

  return lineGenerator.curve(curveMonotoneX)(Array(x.length))!;
}

export type AxisFn = <Domain extends AxisDomain>(scale: D3AxisScale<Domain>) => D3Axis<Domain>;

export function genAxisFn(
  axis: 'x' | 'y',
  dimensions: ChartDimensions,
  position?: AxisPosition,
): [AxisFn | null, string | null] {
  const { height, width, margin } = dimensions;

  switch (axis) {
    case 'x':
      switch (position) {
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
      switch (position) {
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

export function drawAxis(
  ref: SVGGElement | null,
  axis: 'x' | 'y',
  scalerWrapper: ScalerWrapper,
  dimensions: ChartDimensions,
  position: AxisPosition | undefined,
): string {
  if (!ref) {
    return '';
  }

  select(ref)
    .selectAll('*')
    .remove();

  const [axisFn, axisTransform] = genAxisFn(axis, dimensions, position);
  if (!axisFn) {
    return '';
  }

  switch (scalerWrapper.dataType) {
    case AxisDataType.DATE:
    case AxisDataType.NUMBER: {
      select(ref).call(axisFn(scalerWrapper.scaler));
      break;
    }
    case AxisDataType.STRING: {
      select(ref).call(axisFn(scalerWrapper.scaler));
      break;
    }
  }

  return axisTransform || '';
}
