import React from 'react';
import { ChartProps, ChartType } from './common/Props';
import { LineChart } from './LineChart';
import { ScatterChart } from './ScatterChart';
import { BarChart } from './BarChart';
import { AxisOnlyChart } from './AxisOnlyChart';

export function Chart(props: ChartProps) {
  switch (props.type) {
    case ChartType.AXIS_ONLY:
      return <AxisOnlyChart {...props} />;
    case ChartType.LINE:
      return <LineChart {...props} />;
    case ChartType.SCATTER:
      return <ScatterChart {...props} />;
    case ChartType.BAR_HORIZONTAL:
    case ChartType.BAR_VERTICAL:
      return <BarChart {...props} />;
  }
}
