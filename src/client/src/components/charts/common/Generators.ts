import { ChartData } from './Props';
import { curveMonotoneX, line } from 'd3';
import { zip } from '../../../../../shared/utils/utils';
import { Result, Err, Ok } from '../../../utils';
import { pipe } from 'fp-ts/es6/pipeable';
import { chain, either, fromNullable, right } from 'fp-ts/es6/Either';
import { AxisScalers } from './Axis';
import { sequenceT } from 'fp-ts/es6/Apply';
import { generateScaledAxes } from './Scaler';

function checkArrayLengths(axes: ChartData): Result<ChartData> {
  if (axes.x.data.length !== axes.y.data.length) {
    return Err(`Array lengths don't match (${axes.x.data.length} vs ${axes.y.data.length})`);
  }
  return Ok(axes);
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
