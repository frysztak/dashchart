import React from 'react';
import { Chart } from './Chart';
import { ChartAxisDataType, ChartAxisScale, ChartProps, ChartType } from './ChartProps';
import { withKnobs, number } from '@storybook/addon-knobs';

export default { title: 'Chart', decorators: [withKnobs] };

export const basicParabola = () => {
  const x = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const y = x.map(x => x * x);

  const props: ChartProps = {
    height: number('Height', 600),
    width: number('Width', 800),
    margin: {
      top: number('Margin top', 20),
      right: number('Margin right', 15),
      bottom: number('Margin bottom', 60),
      left: number('Margin left', 20),
    },
    data: [
      {
        type: ChartType.LINEAR,
        x: {
          dataType: ChartAxisDataType.NUMBER,
          scale: ChartAxisScale.LINEAR,
          data: x,
        },
        y: {
          dataType: ChartAxisDataType.NUMBER,
          scale: ChartAxisScale.LINEAR,
          data: y,
        },
      },
    ],
  };

  return <Chart {...props} />;
};
