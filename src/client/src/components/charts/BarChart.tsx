import { ChartProps, ChartType } from './common/Props';
import React, { useMemo, useRef } from 'react';
import { AxesTransforms, AxisScalers } from './common/Axis';
import { genPoints, PointCoords } from './common/Generators';
import { useAxesScalers, useAxesTransforms } from './common/Hooks';
import { Result } from '../../utils';
import { sequenceT } from 'fp-ts/es6/Apply';
import { either, fold } from 'fp-ts/es6/Either';
import { getBandWidth } from './common/Scaler';

function Bar(chartType: ChartType, [x, y]: [number, number], idx: number) {}

export function BarChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const scalersR: Result<AxisScalers> = useAxesScalers(props);
  const transformsR: Result<AxesTransforms> = useAxesTransforms(xAxisRef, yAxisRef, props, scalersR);
  const pointsR: Result<PointCoords> = useMemo(() => genPoints(props.data, scalersR), [props.data, scalersR]);
  const bandwidthR: Result<number> = getBandWidth(scalersR, props.type === ChartType.BAR_HORIZONTAL ? 'y' : 'x');
  const results: Result<[AxisScalers, AxesTransforms, PointCoords, number]> = sequenceT(either)(
    scalersR,
    transformsR,
    pointsR,
    bandwidthR,
  );

  return fold(
    (e: Error) => <div>{e.message}</div>,
    ([_, transforms, points, bandwidth]: [AxisScalers, AxesTransforms, PointCoords, number]) => (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={xAxisRef} transform={transforms.x} />
          <g ref={yAxisRef} transform={transforms.y} />
          {points.map(([x, y]: [number, number], i: number) =>
            props.type === ChartType.BAR_VERTICAL ? (
              <rect key={i} x={x} y={y} height={height - margin.bottom - y} width={bandwidth} />
            ) : (
              <rect key={i} x={margin.left} y={y} width={x} height={bandwidth} />
            ),
          )}
        </g>
      </svg>
    ),
  )(results);
}
