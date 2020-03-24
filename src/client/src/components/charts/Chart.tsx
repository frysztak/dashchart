import React, { useEffect, useRef, useState } from 'react';
import { curveMonotoneX, line, ScaleLinear, axisBottom, select, axisLeft } from 'd3';
import { zip } from '../../../../shared/utils/utils';
import { ChartAxisDataType, ChartProps, ChartData } from './ChartProps';
import { genScaler } from './ChartGenerators';

export function Chart(props: ChartProps) {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [svgPath, setSvgPath] = useState<string[]>(Array(props.data.length).fill(''));
  const xAxes = useRef<Array<SVGElement | null>>([]);
  const yAxes = useRef<Array<SVGElement | null>>([]);

  const { width, height, margin } = props;

  useEffect(() => {
    const xRange: [number, number] = [margin.left, width - margin.right];
    const yRange: [number, number] = [height - margin.bottom, margin.top];

    xAxes.current = xAxes.current.slice(0, props.data.length);
    yAxes.current = yAxes.current.slice(0, props.data.length);

    for (let i = 0; i < props.data.length; i++) {
      const chart: ChartData = props.data[i];

      const xScaler: ScaleLinear<number, number> | null = genScaler(chart.x, xRange);
      const yScaler: ScaleLinear<number, number> | null = genScaler(chart.y, yRange);

      if (
        xScaler &&
        yScaler &&
        chart.x.dataType === ChartAxisDataType.NUMBER &&
        chart.y.dataType === ChartAxisDataType.NUMBER
      ) {
        const zipped: [number, number][] = zip(chart.x.data, chart.y.data);
        const path: string = line()
          .x((d: [number, number]) => xScaler(d[0]))
          .y((d: [number, number]) => yScaler(d[1]))
          .curve(curveMonotoneX)(zipped)!;

        const newPath = [...svgPath];
        newPath[i] = path;
        setSvgPath(newPath);

        const currentXAxis: SVGElement | null = xAxes.current[i];
        if (currentXAxis) {
          select(currentXAxis as SVGSVGElement).call(axisBottom(xScaler));
        }

        const currentYAxis: SVGElement | null = yAxes.current[i];
        if (currentYAxis) {
          select(currentYAxis as SVGSVGElement).call(axisLeft(yScaler));
        }
      }
    }
  }, [props]);

  return (
    <svg width={width} height={height} ref={d3Container}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {props.data.map((chart: ChartData, i: number) => (
          <g key={i}>
            <g ref={el => (xAxes.current[i] = el)} transform={`translate(0, ${height - margin.bottom})`} />
            <g ref={el => (yAxes.current[i] = el)} transform={`translate(${margin.left}, 0)`} />
            <path d={svgPath[i]} fill='none' stroke='aqua' />
          </g>
        ))}
      </g>
    </svg>
  );
}
