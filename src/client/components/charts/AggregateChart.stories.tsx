import React from 'react';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { ColumnType, DataFrame } from 'shared/DataFrame/index';
import { AggregateChart, AggregateChartProps } from './AggregateChart';
import { DropZoneLocation } from '../chartcreator/DragNDrop';

export default { title: 'AggregateChart', decorators: [withKnobs] };

const dataFrame = new DataFrame('My DF', {
  id: {
    type: ColumnType.STRING,
    values: ['1', '2', '3', '4', '5'],
  },
  first_name: {
    type: ColumnType.STRING,
    values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay'],
  },
  last_name: {
    type: ColumnType.STRING,
    values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
  },
  email: {
    type: ColumnType.STRING,
    values: [
      'ppassey0@amazonaws.com',
      'bdocker1@pagesperso-orange.fr',
      'tfantini2@reference.com',
      'ffreak3@google.nl',
      'gcutchee4@ifeng.com',
    ],
  },
  numbers: {
    type: ColumnType.NUMBER,
    values: [10, 20, 30, 40, 50],
  },
});

export const xyChart = () => {
  const props: AggregateChartProps = {
    dataFrames: [dataFrame],
    droppedColumns: {
      [DropZoneLocation.BOTTOM]: {
        dataFrameName: 'My DF',
        columnName: 'id',
      },
      [DropZoneLocation.LEFT]: {
        dataFrameName: 'My DF',
        columnName: 'numbers',
      },
    },
  };

  return <AggregateChart {...props} />;
};

export const xyyChart = () => {
  const props: AggregateChartProps = {
    dataFrames: [dataFrame],
    droppedColumns: {
      [DropZoneLocation.BOTTOM]: {
        dataFrameName: 'My DF',
        columnName: 'id',
      },
      [DropZoneLocation.LEFT]: {
        dataFrameName: 'My DF',
        columnName: 'numbers',
      },
      [DropZoneLocation.RIGHT]: {
        dataFrameName: 'My DF',
        columnName: 'last_name',
      },
    },
  };

  return <AggregateChart {...props} />;
};
