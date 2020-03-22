import React, { useEffect, useRef, useState } from 'react';
import { curveMonotoneX, line, ScaleLinear } from 'd3';
import { zip } from '../../../../shared/utils/utils';
import { ChartAxisDataType, ChartMargin, ChartProps } from './ChartProps';
import { genScaler } from './ChartGenerators';

export function Chart(props: ChartProps) {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [svgPath, setSvgPath] = useState<string>('');

  useEffect(() => {
    const margin: ChartMargin = props.margin;
    const width: number = props.width - margin.left - margin.right;
    const height: number = props.height - margin.top - margin.bottom;

    const xRange: [number, number] = [0, width];
    const yRange: [number, number] = [height, 0];

    for (const chart of props.data) {
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
        setSvgPath(path);
      }
    }
  }, [props]);

  return (
    <svg width={props.width} height={props.height} ref={d3Container}>
      <g id='charts'>
        <path d={svgPath} fill={'none'} stroke={'aqua'} />
      </g>
    </svg>
  );
}
