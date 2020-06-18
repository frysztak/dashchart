import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { ChartPreview, CreateNewChart } from './ChartPreview';
import { ChartState } from '../../store/project';
import { ColumnType, DataFrame } from 'shared/DataFrame/index';
import {
  AxisScale,
  ChartDimensions,
  ChartProps,
  ChartType,
  PositionalChartData,
  UserEditableChartProps,
} from './common/Props';
import { DropZoneLocation } from '../chartcreator/DragNDrop';
import { DefaultAxisStyle } from './common/Defaults';
import { Result, takeRight } from 'shared/utils/index';
import { applyUserProps, mapDroppedColumns } from './AggregateChartMapper';
import { isLeft } from 'fp-ts/es6/Either';

export default { title: 'Chart Preview', decorators: [withKnobs] };

const dataFrame: DataFrame = {
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

export const CreateNewChartStory = () => {
  return <CreateNewChart onClick={() => {}} />;
};

export const ChartPreviewSingle = () => {
  const droppedColumns = {
    [DropZoneLocation.BOTTOM]: {
      dataFrameName: 'My DF',
      columnName: 'id',
    },
    [DropZoneLocation.LEFT]: {
      dataFrameName: 'My DF',
      columnName: 'numbers',
    },
  };

  const userProps: UserEditableChartProps[] = [
    {
      type: select('Chart type', ChartType, ChartType.SCATTER),
      dimensions,
      data: {
        x: {
          scale: AxisScale.LINEAR,
          style: DefaultAxisStyle,
        },
        y: {
          scale: AxisScale.LOG,
          style: DefaultAxisStyle,
        },
      },
    },
  ];

  const chartData: Result<PositionalChartData[]> = mapDroppedColumns([dataFrame], droppedColumns);
  const chartPropsR: Result<ChartProps[]> = applyUserProps(chartData, userProps);
  if (isLeft(chartPropsR)) {
    return <div>{chartPropsR.left}</div>;
  }
  const chartProps: ChartProps[] = takeRight(chartPropsR);
  const props: ChartState = {
    id: 1,
    name: 'Chart #1',
    props: {
      chartProps,
    },
  };

  return <ChartPreview {...props} />;
};

export const ChartPreviewDouble = () => {
  const droppedColumns = {
    [DropZoneLocation.BOTTOM]: {
      dataFrameName: 'My DF',
      columnName: 'id',
    },
    [DropZoneLocation.LEFT]: {
      dataFrameName: 'My DF',
      columnName: 'numbers',
    },
    [DropZoneLocation.TOP]: {
      dataFrameName: 'My DF',
      columnName: 'last_name',
    },
  };

  const userProps: UserEditableChartProps[] = [
    {
      type: select('Chart type', ChartType, ChartType.SCATTER),
      dimensions,
      data: {
        x: {
          scale: AxisScale.LINEAR,
          style: DefaultAxisStyle,
        },
        y: {
          scale: AxisScale.LINEAR,
          style: DefaultAxisStyle,
        },
      },
    },
    {
      type: select('Chart type 2', ChartType, ChartType.LINE),
      dimensions,
      data: {
        x: {
          scale: AxisScale.LINEAR,
          style: DefaultAxisStyle,
        },
        y: {
          scale: AxisScale.LINEAR,
          style: DefaultAxisStyle,
        },
      },
    },
  ];

  const chartData: Result<PositionalChartData[]> = mapDroppedColumns([dataFrame], droppedColumns);
  const chartPropsR: Result<ChartProps[]> = applyUserProps(chartData, userProps);
  if (isLeft(chartPropsR)) {
    return <div>{chartPropsR.left}</div>;
  }
  const chartProps: ChartProps[] = takeRight(chartPropsR);
  const props: ChartState = {
    id: 1,
    name: 'Chart #1',
    props: {
      chartProps,
    },
  };

  return <ChartPreview {...props} />;
};
