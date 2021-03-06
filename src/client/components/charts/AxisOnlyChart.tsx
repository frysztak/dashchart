import { ChartProps } from './common/Props';
import React, { useRef } from 'react';
import { AxisScalers, AxesTransforms } from './common/Axis';
import { useAxesTransforms, useAxesScalers, AxisStyles, useAxesStyles } from './common/Hooks';
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
  const styles: AxisStyles = useAxesStyles(props);

  return fold(
    (e: Error) => {
      throw e;
    },
    ([_, transforms]: [AxisScalers, AxesTransforms]) => (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={xAxisRef} transform={transforms.x} style={styles.x} />
          <g ref={yAxisRef} transform={transforms.y} style={styles.y} />
        </g>
      </svg>
    ),
  )(results);
}
