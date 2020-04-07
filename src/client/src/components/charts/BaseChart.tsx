import React, { useEffect, useRef, useState } from 'react';
import { ChartData, BaseChartProps } from './ChartProps';
import { getRanges, getAxisScalers, AxisTransforms, getAxisTransforms, AxisRanges, AxisScalers } from './ChartCommon';

export type PrepareChartCallback = (axisRanges: AxisRanges, scalers: AxisScalers) => void;

export function BaseChart(prepareChartCallback: PrepareChartCallback) {
  return (props: BaseChartProps) => {
    const [axisTransforms, setAxisTransforms] = useState<AxisTransforms>();
    const xAxisRef = useRef<SVGGElement | null>(null);
    const yAxisRef = useRef<SVGGElement | null>(null);

    const { width, height, margin } = props.dimensions;

    useEffect(() => {
      const chart: ChartData = props.data;
      const axisRanges: AxisRanges = getRanges(props.dimensions);
      const scalers: AxisScalers = getAxisScalers(chart, axisRanges);
      setAxisTransforms(getAxisTransforms(xAxisRef, yAxisRef, chart, scalers, props.dimensions));

      prepareChartCallback(axisRanges, scalers);
    });

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g>
            <g ref={xAxisRef} transform={axisTransforms?.x} />
            <g ref={yAxisRef} transform={axisTransforms?.y} />
            {props.children}
          </g>
        </g>
      </svg>
    );
  };
}
