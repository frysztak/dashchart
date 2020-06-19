import { ChartProps } from './common/Props';
import React, { useMemo, useRef } from 'react';
import { AxisScalers, AxesTransforms } from './common/Axis';
import { genPath } from './common/Generators';
import { useAxesTransforms, useAxesScalers, useAxesStyles, AxisStyles } from './common/Hooks';
import { Result } from 'shared/utils';
import { fold, either } from 'fp-ts/es6/Either';
import { sequenceT } from 'fp-ts/es6/Apply';

export function LineChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const scalersR: Result<AxisScalers> = useAxesScalers(props);
  const transformsR: Result<AxesTransforms> = useAxesTransforms(xAxisRef, yAxisRef, props, scalersR);
  const svgPathR: Result<string> = useMemo(() => genPath(props.data, scalersR), [props.data, scalersR]);
  const results: Result<[AxisScalers, AxesTransforms, string]> = sequenceT(either)(scalersR, transformsR, svgPathR);
  const styles: AxisStyles = useAxesStyles(props);

  return fold(
    (e: Error) => {
      throw e;
    },
    ([_, transforms, svgPath]: [AxisScalers, AxesTransforms, string]) => (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={xAxisRef} transform={transforms.x} style={styles.x} />
          <g ref={yAxisRef} transform={transforms.y} style={styles.y} />
          <path d={svgPath} fill='none' stroke={props.colour} />
        </g>
      </svg>
    ),
  )(results);
}
