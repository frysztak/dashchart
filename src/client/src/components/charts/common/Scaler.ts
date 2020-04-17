import { Axis, AxisDataType, AxisScale, ChartData } from './Props';
import {
  ScaleBand,
  scaleBand,
  scaleLinear,
  ScaleLinear,
  scaleLog,
  ScaleLogarithmic,
  scaleOrdinal,
  ScaleOrdinal,
  scaleTime,
  ScaleTime,
} from 'd3';
import { Err, Ok, Result } from '../../../utils';
import { minmax } from '../../../../../shared/utils/utils';
import { AxisScalers } from './Axis';
import { sequenceT } from 'fp-ts/es6/Apply';
import { either, fromNullable, chain } from 'fp-ts/es6/Either';
import { array } from 'fp-ts/es6/Array';

export type NumberScaler = ScaleLinear<number, number> | ScaleLogarithmic<number, number> | ScaleBand<number>;
export type DateScaler = ScaleTime<number, number> | ScaleBand<Date>;
export type StringScaler = ScaleOrdinal<string, number> | ScaleBand<string>;

export type ScalerWrapper =
  | {
      dataType: AxisDataType.NUMBER;
      scaler: NumberScaler;
    }
  | {
      dataType: AxisDataType.DATE;
      scaler: DateScaler;
    }
  | {
      dataType: AxisDataType.STRING;
      scaler: StringScaler;
    };

export function genScaler(axis: Axis, range: [number, number], useBandScale: boolean): Result<ScalerWrapper> {
  if (axis.scale === AxisScale.LOG) {
    if (axis.dataType === AxisDataType.STRING || axis.dataType === AxisDataType.DATE) {
      return Err(`Scale '${axis.scale}' is unsupported with data type '${axis.dataType}'.`);
    }
  }

  switch (axis.dataType) {
    case AxisDataType.NUMBER: {
      if (useBandScale) {
        return Ok({
          dataType: axis.dataType,
          scaler: scaleBand<number>()
            .domain(axis.data)
            .rangeRound(range)
            .padding(0.1),
        });
      }

      const domain: number[] = axis.domain || minmax(axis.data);
      const scale = axis.scale === AxisScale.LINEAR ? scaleLinear() : scaleLog();
      return Ok({ dataType: axis.dataType, scaler: scale.domain(domain).range(range) });
    }
    case AxisDataType.DATE: {
      if (useBandScale) {
        return Ok({
          dataType: axis.dataType,
          scaler: scaleBand<Date>()
            .domain(axis.data)
            .rangeRound(range)
            .padding(0.6),
        });
      }

      const domain: Date[] = axis.domain || minmax(axis.data);
      return Ok({
        dataType: axis.dataType,
        scaler: scaleTime<number, number>()
          .domain(domain)
          .range(range)
          .nice(),
      });
    }
    case AxisDataType.STRING: {
      if (useBandScale) {
        return Ok({
          dataType: axis.dataType,
          scaler: scaleBand<string>()
            .domain(axis.data)
            .rangeRound(range)
            .padding(0.1),
        });
      }
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

export function scaleAxis(wrapper: ScalerWrapper, axis: Axis): Result<number[]> {
  switch (wrapper.dataType) {
    case AxisDataType.NUMBER: {
      if (axis.dataType !== AxisDataType.NUMBER) {
        return Err(`Scaler received data of type '${axis.dataType}', but expected '${wrapper.dataType}'`);
      }
      const mapValue = (v: number): Result<number> =>
        fromNullable(new Error(`Scaler failed on value '${v}'`))(wrapper.scaler(v));
      return array.traverse(either)(axis.data, (v: number) => mapValue(v));
    }
    case AxisDataType.DATE: {
      if (axis.dataType !== AxisDataType.DATE) {
        return Err(`Scaler received data of type '${axis.dataType}', but expected '${wrapper.dataType}'`);
      }
      const mapValue = (v: Date): Result<number> =>
        fromNullable(new Error(`Scaler failed on value '${v}'`))(wrapper.scaler(v));
      return array.traverse(either)(axis.data, (v: Date) => mapValue(v));
    }
    case AxisDataType.STRING: {
      if (axis.dataType !== AxisDataType.STRING) {
        return Err(`Scaler received data of type '${axis.dataType}', but expected '${wrapper.dataType}'`);
      }
      const mapValue = (v: string): Result<number> =>
        fromNullable(new Error(`Scaler failed on value '${v}'`))(wrapper.scaler(v));
      return array.traverse(either)(axis.data, (v: string) => mapValue(v));
    }
  }
}

export function generateScaledAxes([axes, axisScalers]: [ChartData, AxisScalers]): Result<[number[], number[]]> {
  return sequenceT(either)(scaleAxis(axisScalers.x, axes.x), scaleAxis(axisScalers.y, axes.y));
}

export function getBandWidth(axisScalers: Result<AxisScalers>, axis: 'x' | 'y'): Result<number> {
  return chain((scalers: AxisScalers) => {
    const scaler = axis === 'x' ? scalers.x.scaler : scalers.y.scaler;
    if ('bandwidth' in scaler) {
      return Ok(scaler.bandwidth());
    }
    return Err(`Scaler doesn't have bandwidth() method.`);
  })(axisScalers);
}
