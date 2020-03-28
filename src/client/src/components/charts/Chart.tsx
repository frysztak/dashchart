import React, { useEffect, useRef, useState } from 'react';
import { axisBottom, axisLeft, curveMonotoneX, line, ScaleLinear, select } from 'd3';
import { zip } from '../../../../shared/utils/utils';
import { AxisDataType, ChartData, ChartProps } from './ChartProps';
import { genScaler } from './ChartGenerators';
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
    const xScaler: ScaleLinear<number, number> | null = genScaler(chart.x, xRange);
    const yScaler: ScaleLinear<number, number> | null = genScaler(chart.y, yRange);

    if (xScaler && yScaler && chart.x.dataType === AxisDataType.NUMBER && chart.y.dataType === AxisDataType.NUMBER) {
      const zipped: [number, number][] = zip(chart.x.data, chart.y.data);
      const path: string = line()
        .x((d: [number, number]) => xScaler(d[0]))
        .y((d: [number, number]) => yScaler(d[1]))
        .curve(curveMonotoneX)(zipped)!;

      setSvgPath(path);
      setLineColour(getColour(colourScheme, 0));

      const currentXAxis: SVGGElement | null = xAxes.current;
      if (currentXAxis) {
        select(currentXAxis).call(axisBottom(xScaler));
      }

      const currentYAxis: SVGGElement | null = yAxes.current;
      if (currentYAxis) {
        select(currentYAxis).call(axisLeft(yScaler));
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
