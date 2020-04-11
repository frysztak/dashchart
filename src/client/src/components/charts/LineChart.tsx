import { ChartProps } from './ChartProps';
import React, { useMemo, useRef, useState } from 'react';
import { ColourSchemes, getColour } from './ColourSchemes';
import { AxisScalers, AxesTransforms } from './ChartCommon';
import { genPath } from './ChartGenerators';
import { useAxesTransforms, useAxesScalers } from './ChartHooks';

export function LineChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const colourScheme = ColourSchemes.Ocean;
  const [lineColour, setLineColour] = useState<string>(getColour(colourScheme, 0));

  const scalers: AxisScalers = useAxesScalers(props);
  const axesTransforms: AxesTransforms | undefined = useAxesTransforms(xAxisRef, yAxisRef, props, scalers);
  const svgPath: string = useMemo(() => genPath(props.data, scalers.x, scalers.y), [props.data, scalers]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
          <g ref={xAxisRef} transform={axesTransforms?.x} />
          <g ref={yAxisRef} transform={axesTransforms?.y} />
          <path d={svgPath} fill='none' stroke={lineColour} />
        </g>
      </g>
    </svg>
  );
}
