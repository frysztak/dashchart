import React, { useEffect, useRef, useState } from 'react';
import { axisBottom, axisLeft, select } from 'd3';
import { AxisDataType, ChartData, ChartProps } from './ChartProps';
import { genPath, genScaler } from './ChartGenerators';
import { ColourSchemes, getColour } from './ColourSchemes';

export function Chart(props: ChartProps) {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [svgPath, setSvgPath] = useState<string>('');
  const [lineColour, setLineColour] = useState<string>('');
  const xAxes = useRef<SVGGElement | null>(null);
  const yAxes = useRef<SVGGElement | null>(null);

  const { width, height, margin } = props;

  const colourScheme = ColourSchemes.Ocean;

  useEffect(() => {
    const xRange: [number, number] = [margin.left, width - margin.right];
    const yRange: [number, number] = [height - margin.bottom, margin.top];

    const chart: ChartData = props.data;
    const xScaler = genScaler(chart.x, xRange)!;
    const yScaler = genScaler(chart.y, yRange)!;
    const path: string = genPath(chart, xScaler, yScaler);

    setSvgPath(path);
    setLineColour(getColour(colourScheme, 0));

    const currentXAxis: SVGGElement | null = xAxes.current;
    if (currentXAxis) {
      switch (xScaler.dataType) {
        case AxisDataType.DATE:
        case AxisDataType.NUMBER: {
          select(currentXAxis).call(axisBottom(xScaler.scaler));
          break;
        }
        case AxisDataType.STRING: {
          select(currentXAxis).call(axisBottom(xScaler.scaler));
          break;
        }
      }
    }

    const currentYAxis: SVGGElement | null = yAxes.current;
    if (currentYAxis) {
      switch (yScaler.dataType) {
        case AxisDataType.DATE:
        case AxisDataType.NUMBER: {
          select(currentYAxis).call(axisLeft(yScaler.scaler));
          break;
        }
        case AxisDataType.STRING: {
          select(currentYAxis).call(axisLeft(yScaler.scaler));
          break;
        }
      }
    }
  }, [props]);

  return (
    <svg width={width} height={height} ref={d3Container}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
          <g ref={xAxes} transform={`translate(0, ${height - margin.bottom})`} />
          <g ref={yAxes} transform={`translate(${margin.left}, 0)`} />
          <path d={svgPath} fill='none' stroke={lineColour} />
        </g>
      </g>
    </svg>
  );
}
