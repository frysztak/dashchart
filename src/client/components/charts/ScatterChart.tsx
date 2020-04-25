import { ChartProps } from './common/Props';
import React, { useMemo, useRef } from 'react';
import { AxisScalers, AxesTransforms } from './common/Axis';
import { genPoints, PointCoords } from './common/Generators';
import { useAxesScalers, useAxesTransforms } from './common/Hooks';
import { Result } from 'shared/utils';
import { sequenceT } from 'fp-ts/es6/Apply';
import { either, fold } from 'fp-ts/es6/Either';

export function ScatterChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const scalersR: Result<AxisScalers> = useAxesScalers(props);
  const transformsR: Result<AxesTransforms> = useAxesTransforms(xAxisRef, yAxisRef, props, scalersR);
  const pointsR: Result<PointCoords> = useMemo(() => genPoints(props.data, scalersR), [props.data, scalersR]);
  const results: Result<[AxisScalers, AxesTransforms, PointCoords]> = sequenceT(either)(scalersR, transformsR, pointsR);

  return fold(
    (e: Error) => <div>{e.message}</div>,
    ([_, transforms, points]: [AxisScalers, AxesTransforms, PointCoords]) => (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={xAxisRef} transform={transforms.x} />
          <g ref={yAxisRef} transform={transforms.y} />
          {points.map(([x, y]: [number, number], i: number) => (
            <circle cx={x} cy={y} r={2} key={i} />
          ))}
        </g>
      </svg>
    ),
  )(results);
}
