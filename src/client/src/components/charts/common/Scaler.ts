import { Axis, AxisDataType, AxisScale, ChartData } from './Props';
import {
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
import { either } from 'fp-ts/es6/Either';

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

export function scaleAxis(wrapper: ScalerWrapper, axis: Axis): Result<number[]> {
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

export function generateScaledAxes([axes, axisScalers]: [ChartData, AxisScalers]): Result<[number[], number[]]> {
  return sequenceT(either)(scaleAxis(axisScalers.x, axes.x), scaleAxis(axisScalers.y, axes.y));
}
