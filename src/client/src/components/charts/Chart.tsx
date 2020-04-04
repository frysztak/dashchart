import React, { useEffect, useRef, useState } from 'react';
import { ChartData, ChartProps } from './ChartProps';
import { genPath, genScaler, drawAxis } from './ChartGenerators';
import { ColourSchemes, getColour } from './ColourSchemes';

export function Chart(props: ChartProps) {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [svgPath, setSvgPath] = useState<string>('');
  const [lineColour, setLineColour] = useState<string>('');
  const [xAxisTransform, setXAxisTransform] = useState<string>('');
  const [yAxisTransform, setYAxisTransform] = useState<string>('');
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);

  const { width, height, margin } = props.dimensions;
  const colourScheme = ColourSchemes.Ocean;

  useEffect(() => {
    const xRange: [number, number] = [margin.left, width - margin.right];
    const yRange: [number, number] = [height - margin.bottom, margin.top];

    const chart: ChartData = props.data;
    const xScaler = genScaler(chart.x, xRange);
    const yScaler = genScaler(chart.y, yRange);
    const path: string = genPath(chart, xScaler, yScaler);

    setSvgPath(path);
    setLineColour(getColour(colourScheme, 0));

    setXAxisTransform(drawAxis(xAxisRef.current, 'x', xScaler, props.dimensions, chart.x.position));
    setYAxisTransform(drawAxis(yAxisRef.current, 'y', yScaler, props.dimensions, chart.y.position));
  }, [props]);

  return (
    <svg width={width} height={height} ref={d3Container}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
          <g ref={xAxisRef} transform={xAxisTransform} />
          <g ref={yAxisRef} transform={yAxisTransform} />
          <path d={svgPath} fill='none' stroke={lineColour} />
        </g>
      </g>
    </svg>
  );
}
