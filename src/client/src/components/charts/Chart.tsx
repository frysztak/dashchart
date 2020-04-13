import React from 'react';
import { ChartProps, ChartType } from './common/Props';
import { LineChart } from './LineChart';
import { ScatterChart } from './ScatterChart';

export function Chart(props: ChartProps) {
  switch (props.type) {
    case ChartType.LINE:
      return <LineChart {...props} />;
    case ChartType.SCATTER:
      return <ScatterChart {...props} />;
  }
}
