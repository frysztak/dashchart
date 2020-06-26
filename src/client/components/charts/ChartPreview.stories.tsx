import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { ChartPreview, ChartPreviewProps } from './ChartPreview';
import { ColumnType, DataFrame } from 'shared/DataFrame/index';
import { AxisScale, ChartDimensions, ChartType, UserEditableChartProps } from './common/Props';
import { DropZoneLocation } from '../chartcreator/DragNDrop';
import { DefaultAxisStyle, DefaultChartProps } from './common/Defaults';

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
      ...DefaultChartProps,
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

  const props: ChartPreviewProps = {
    id: 1,
    projectId: 1,
    name: 'Chart #1',
    userProps: userProps,
    columns: droppedColumns,
    onClick: () => {
      console.log('click');
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
      ...DefaultChartProps,
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
      ...DefaultChartProps,
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

  const props: ChartPreviewProps = {
    id: 1,
    projectId: 1,
    name: 'Chart #1',
    userProps: userProps,
    columns: droppedColumns,
    onClick: () => {
      console.log('click');
    },
  };

  return <ChartPreview {...props} />;
};
