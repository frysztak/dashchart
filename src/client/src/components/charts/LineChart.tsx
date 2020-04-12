import { ChartProps } from './ChartProps';
import React, { useMemo, useRef, useState } from 'react';
import { ColourSchemes, getColour } from './ColourSchemes';
import { AxisScalers, AxesTransforms } from './ChartCommon';
import { genPath } from './ChartGenerators';
import { useAxesTransforms, useAxesScalers } from './ChartHooks';
import { Result } from '../../utils';
import { fold, either } from 'fp-ts/es6/Either';
import { sequenceT } from 'fp-ts/es6/Apply';

export function LineChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const colourScheme = ColourSchemes.Ocean;
  const [lineColour, setLineColour] = useState<string>(getColour(colourScheme, 0));

  const scalersR: Result<AxisScalers> = useAxesScalers(props);
  const transformsR: Result<AxesTransforms> = useAxesTransforms(xAxisRef, yAxisRef, props, scalersR);
  const svgPathR: Result<string> = useMemo(() => genPath(props.data, scalersR), [props.data, scalersR]);
  const results: Result<[AxisScalers, AxesTransforms, string]> = sequenceT(either)(scalersR, transformsR, svgPathR);

  return fold(
    (e: Error) => <div>{e.message}</div>,
    ([_, transforms, svgPath]: [AxisScalers, AxesTransforms, string]) => (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={xAxisRef} transform={transforms.x} />
          <g ref={yAxisRef} transform={transforms.y} />
          <path d={svgPath} fill='none' stroke={lineColour} />
        </g>
      </svg>
    ),
  )(results);
}
