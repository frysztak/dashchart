import React from 'react';
import { Chart } from './Chart';
import { AxisDataType, AxisPosition, AxisScale, ChartProps, ChartType } from './ChartProps';
import { number, select, withKnobs } from '@storybook/addon-knobs';

export default { title: 'Chart', decorators: [withKnobs] };

export const singlePlot = () => {
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const y = x.map(x => x * x);

  const props: ChartProps = {
    dimensions: {
      height: number('Height', 600),
      width: number('Width', 800),
      margin: {
        top: number('Margin top', 20),
        right: number('Margin right', 60),
        bottom: number('Margin bottom', 60),
        left: number('Margin left', 20),
      },
    },
    type: ChartType.LINE,
    data: {
      x: {
        dataType: AxisDataType.NUMBER,
        scale: select('X axis scale', AxisScale, AxisScale.LINEAR),
        position: select('X axis position', AxisPosition, AxisPosition.PRIMARY),
        data: x,
        style: {
          tickPadding: number('X axis tick padding', 3),
          tickSize: number('X axis tick size', 6),
        },
      },
      y: {
        dataType: AxisDataType.NUMBER,
        scale: select('Y axis scale', AxisScale, AxisScale.LINEAR),
        position: select('Y axis position', AxisPosition, AxisPosition.PRIMARY),
        data: y,
        style: {
          tickPadding: number('X axis tick padding', 3),
          tickSize: number('X axis tick size', 6),
        },
      },
    },
  };

  return <Chart {...props} />;
};

export const plotWithDates = () => {
  const x = [
    new Date('1995-12-17T03:24:00'),
    new Date('1996-12-17T03:24:00'),
    new Date('1997-12-17T03:24:00'),
    new Date('1998-12-17T03:24:00'),
    new Date('1999-12-17T03:24:00'),
    new Date('2000-12-17T03:24:00'),
  ];
  const y = [15, 20, 25, 5, 20];

  const props: ChartProps = {
    dimensions: {
      height: number('Height', 600),
      width: number('Width', 800),
      margin: {
        top: number('Margin top', 20),
        right: number('Margin right', 60),
        bottom: number('Margin bottom', 60),
        left: number('Margin left', 20),
      },
    },
    type: ChartType.LINE,
    data: {
      x: {
        dataType: AxisDataType.DATE,
        scale: select('X axis scale', AxisScale, AxisScale.LINEAR),
        position: select('X axis position', AxisPosition, AxisPosition.PRIMARY),
        data: x,
      },
      y: {
        dataType: AxisDataType.NUMBER,
        scale: select('Y axis scale', AxisScale, AxisScale.LINEAR),
        position: select('Y axis position', AxisPosition, AxisPosition.PRIMARY),
        data: y,
      },
    },
  };

  return <Chart {...props} />;
};

export const plotWithDatesAndStrings = () => {
  const x = [
    new Date('1995-12-17T03:24:00'),
    new Date('1996-12-17T03:24:00'),
    new Date('1997-12-17T03:24:00'),
    new Date('1998-12-17T03:24:00'),
    new Date('1999-12-17T03:24:00'),
    new Date('2000-12-17T03:24:00'),
  ];
  const y = ['Ulrich', 'Pszemek', 'Egon', 'Bartosz', 'Helge'];

  const props: ChartProps = {
    dimensions: {
      height: number('Height', 600),
      width: number('Width', 800),
      margin: {
        top: number('Margin top', 20),
        right: number('Margin right', 60),
        bottom: number('Margin bottom', 60),
        left: number('Margin left', 30),
      },
    },
    type: ChartType.LINE,
    data: {
      x: {
        dataType: AxisDataType.DATE,
        scale: select('X axis scale', AxisScale, AxisScale.LINEAR),
        position: select('X axis position', AxisPosition, AxisPosition.PRIMARY),
        data: x,
      },
      y: {
        dataType: AxisDataType.STRING,
        scale: select('Y axis scale', AxisScale, AxisScale.LINEAR),
        position: select('Y axis position', AxisPosition, AxisPosition.PRIMARY),
        data: y,
      },
    },
  };

  return <Chart {...props} />;
};
