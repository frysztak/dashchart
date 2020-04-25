import { AxisDataType, ChartData } from './Props';
import { curveMonotoneX, line } from 'd3-shape';
import { zip } from 'shared/utils';
import { Err, Ok, Result } from 'shared/utils';
import { pipe } from 'fp-ts/es6/pipeable';
import { chain, either, fromNullable, right } from 'fp-ts/es6/Either';
import { AxisScalers } from './Axis';
import { sequenceT } from 'fp-ts/es6/Apply';
import { generateScaledAxes } from './Scaler';

type XY = [number[], number[]];

function checkArrayLengths(axes: ChartData): Result<ChartData> {
  if (axes.x.data.length !== axes.y.data.length) {
    return Err(`Array lengths don't match (${axes.x.data.length} vs ${axes.y.data.length})`);
  }
  return Ok(axes);
}

function generateSvgPath([x, y]: XY): Result<string> {
  return fromNullable(Error('Line generator returned null'))(
    line()
      .x((_, i) => x[i])
      .y((_, i) => y[i])
      .curve(curveMonotoneX)(Array(x.length)),
  );
}

export function genPath(axes: ChartData, axisScalers: Result<AxisScalers>): Result<string> {
  const scaledAxes: Result<XY> = chain(generateScaledAxes)(
    sequenceT(either)(chain(checkArrayLengths)(right(axes)), axisScalers),
  );

  return pipe(scaledAxes, chain(generateSvgPath));
}

export type PointCoords = [number, number][];

function generateScatterPoints([x, y]: XY): Result<PointCoords> {
  return Ok(zip(x, y));
}

export function genPoints(axes: ChartData, axisScalers: Result<AxisScalers>): Result<PointCoords> {
  const scaledAxes: Result<XY> = chain(generateScaledAxes)(
    sequenceT(either)(chain(checkArrayLengths)(right(axes)), axisScalers),
  );

  return pipe(scaledAxes, chain(generateScatterPoints));
}

function subtractBandwidth(data: ChartData, scaledAxes: XY, axis: 'x' | 'y', bandwidthR: Result<number>): Result<XY> {
  return pipe(
    bandwidthR,
    chain(
      (bandwidth: number): Result<XY> => {
        const [x, y] = scaledAxes;
        if (axis === 'x') {
          return Ok([x.map(v => v - bandwidth / 2), y]);
        } else {
          return Ok([x, y.map(v => v - bandwidth / 2)]);
        }
      },
    ),
  );
}

export function useSecondaryDateAxis(data: ChartData, barAxis: 'x' | 'y') {
  return barAxis === 'x' ? data.x.dataType === AxisDataType.DATE : data.y.dataType === AxisDataType.DATE;
}

export function genBarPoints(
  data: ChartData,
  barAxis: 'x' | 'y',
  barAxisScalers: Result<AxisScalers>,
  scatterAxisScalers: Result<AxisScalers>,
  bandwidthR: Result<number>,
  useSecondaryDateAxis: boolean,
): Result<PointCoords> {
  const scatterScaledAxes: Result<XY> = chain(generateScaledAxes)(
    sequenceT(either)(
      chain(checkArrayLengths)(right(data)),
      useSecondaryDateAxis ? scatterAxisScalers : barAxisScalers,
    ),
  );

  return pipe(
    scatterScaledAxes,
    chain(
      (axes: XY): Result<XY> =>
        useSecondaryDateAxis ? subtractBandwidth(data, axes, barAxis, bandwidthR) : right(axes),
    ),
    chain(generateScatterPoints),
  );
}
