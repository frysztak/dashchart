import { ChartProps } from './ChartProps';
import React, { useState } from 'react';
import { BaseChart } from './BaseChart';
import { ColourSchemes, getColour } from './ColourSchemes';
import { AxisRanges, AxisScalers } from './ChartCommon';
import { genPath } from './ChartGenerators';

export function LineChart(props: ChartProps) {
  const [svgPath, setSvgPath] = useState<string>('');
  const [lineColour, setLineColour] = useState<string>('');

  const colourScheme = ColourSchemes.Ocean;
  const Chart = BaseChart((axisRanges: AxisRanges, scalers: AxisScalers) => {
    const path: string = genPath(props.data, scalers.x, scalers.y);
    setSvgPath(path);
    setLineColour(getColour(colourScheme, 0));
  });

  return (
    <Chart {...props}>
      <path d={svgPath} fill='none' stroke={lineColour} />
    </Chart>
  );
}
