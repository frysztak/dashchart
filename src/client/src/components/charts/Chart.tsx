import React from 'react';
import { ChartProps, ChartType } from './ChartProps';
import { LineChart } from './LineChart';

export function Chart(props: ChartProps) {
  switch (props.type) {
    case ChartType.LINE:
      return <LineChart {...props} />;
    case ChartType.SCATTER:
      return <LineChart {...props} />;
  }
}
