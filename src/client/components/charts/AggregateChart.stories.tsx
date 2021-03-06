import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { ColumnType, DataFrame } from 'shared/DataFrame/index';
import { AggregateChart } from './AggregateChart';
import { DropZoneLocation } from '../chartcreator/DragNDrop';
import { Result } from 'shared/utils/index';
import {
  AxisScale,
  ChartDimensions,
  ChartProps,
  ChartType,
  PositionalChartData,
  UserEditableChartProps,
} from './common/Props';
import { applyUserProps, mapDroppedColumns } from './AggregateChartMapper';
import { fold } from 'fp-ts/es6/Either';
import { DefaultAxisStyle, DefaultChartProps } from './common/Defaults';

export default { title: 'AggregateChart', decorators: [withKnobs] };

const dataFrame: DataFrame = {
  id: 1,
  name: 'My DF',
  columns: {
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
  },
};

const dimensions: ChartDimensions = {
  height: 400,
  width: 600,
  margin: {
    top: 20,
    left: 30,
    right: 80,
    bottom: 50,
  },
};

export const xyChart = () => {
  const droppedColumns = {
    [DropZoneLocation.BOTTOM]: {
      dataFrameId: 1,
      dataFrameName: 'My DF',
      columnName: 'id',
    },
    [DropZoneLocation.LEFT]: {
      dataFrameId: 1,
      dataFrameName: 'My DF',
      columnName: 'numbers',
    },
  };

  const userProps: UserEditableChartProps[] = [
    {
      ...DefaultChartProps,
      type: select('Chart type', ChartType, ChartType.SCATTER),
      dimensions,
      data: {
        x: {
          scale: select('X axis scale', AxisScale, AxisScale.LINEAR),
          style: DefaultAxisStyle,
        },
        y: {
          scale: select('Y axis scale', AxisScale, AxisScale.LOG),

          style: DefaultAxisStyle,
        },
      },
    },
  ];

  const chartData: Result<PositionalChartData[]> = mapDroppedColumns([dataFrame], droppedColumns);
  const chartPropsR: Result<ChartProps[]> = applyUserProps(chartData, userProps);

  return fold(
    (e: Error) => <div>{e.message}</div>,
    (chartProps: ChartProps[]) => <AggregateChart chartProps={chartProps} />,
  )(chartPropsR);
};

export const xyyChart = () => {
  const droppedColumns = {
    [DropZoneLocation.BOTTOM]: {
      dataFrameId: 1,
      dataFrameName: 'My DF',
      columnName: 'id',
    },
    [DropZoneLocation.LEFT]: {
      dataFrameId: 1,
      dataFrameName: 'My DF',
      columnName: 'numbers',
    },
    [DropZoneLocation.RIGHT]: {
      dataFrameId: 1,
      dataFrameName: 'My DF',
      columnName: 'last_name',
    },
  };

  const userProps: UserEditableChartProps[] = [
    {
      ...DefaultChartProps,
      type: select('1st Chart type', ChartType, ChartType.SCATTER),
      dimensions,
      data: {
        x: {
          scale: select('1st X axis scale', AxisScale, AxisScale.LINEAR),
          style: DefaultAxisStyle,
        },
        y: {
          scale: select('1st Y axis scale', AxisScale, AxisScale.LINEAR),

          style: DefaultAxisStyle,
        },
      },
    },
    {
      ...DefaultChartProps,
      type: select('2st Chart type', ChartType, ChartType.SCATTER),
      dimensions,
      data: {
        x: {
          scale: select('2st X axis scale', AxisScale, AxisScale.LINEAR),
          style: DefaultAxisStyle,
        },
        y: { scale: select('2st Y axis scale', AxisScale, AxisScale.LINEAR), style: DefaultAxisStyle },
      },
    },
  ];

  const chartData: Result<PositionalChartData[]> = mapDroppedColumns([dataFrame], droppedColumns);
  const chartPropsR: Result<ChartProps[]> = applyUserProps(chartData, userProps);

  return fold(
    (e: Error) => <div>{e.message}</div>,
    (chartProps: ChartProps[]) => <AggregateChart chartProps={chartProps} />,
  )(chartPropsR);
};
