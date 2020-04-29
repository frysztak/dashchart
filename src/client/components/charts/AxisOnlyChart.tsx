import { ChartProps } from './common/Props';
import React, { useRef } from 'react';
import { AxisScalers, AxesTransforms } from './common/Axis';
import { useAxesTransforms, useAxesScalers } from './common/Hooks';
import { Result } from 'shared/utils';
import { fold, either } from 'fp-ts/es6/Either';
import { sequenceT } from 'fp-ts/es6/Apply';

export function AxisOnlyChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const scalersR: Result<AxisScalers> = useAxesScalers(props);
  const transformsR: Result<AxesTransforms> = useAxesTransforms(xAxisRef, yAxisRef, props, scalersR);
  const results: Result<[AxisScalers, AxesTransforms]> = sequenceT(either)(scalersR, transformsR);

  return fold(
    (e: Error) => <div>{e.message}</div>,
    ([_, transforms]: [AxisScalers, AxesTransforms]) => (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={xAxisRef} transform={transforms.x} />
          <g ref={yAxisRef} transform={transforms.y} />
        </g>
      </svg>
    ),
  )(results);
}
