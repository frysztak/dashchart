import { ChartProps } from './ChartProps';
import React, { useMemo, useRef } from 'react';
import { AxisScalers, AxesTransforms } from './ChartCommon';
import { genPoints, PointCoords } from './ChartGenerators';
import { useAxesScalers, useAxesTransforms } from './ChartHooks';

export function ScatterChart(props: ChartProps) {
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);
  const { width, height, margin } = props.dimensions;

  const scalers: AxisScalers = useAxesScalers(props);
  const axesTransforms: AxesTransforms | undefined = useAxesTransforms(xAxisRef, yAxisRef, props, scalers);
  const points: PointCoords = useMemo(() => genPoints(props.data, scalers.x, scalers.y), [props.data, scalers]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
          <g ref={xAxisRef} transform={axesTransforms?.x} />
          <g ref={yAxisRef} transform={axesTransforms?.y} />
          {points.map(([x, y]: [number, number]) => (
            <circle cx={x} cy={y} r={2} />
          ))}
        </g>
      </g>
    </svg>
  );
}
