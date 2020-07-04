import React from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { ChartCreator, ChartCreatorProps } from './ChartCreator';
import { DropZoneLocation } from './DragNDrop';

export default { title: 'ChartCreator', decorators: [withKnobs] };

export const ChartCreatorWithoutDroppedColumns = () => {
  const props: ChartCreatorProps = {
    isDragging: boolean('isDragging', false),
    activeDropZone: select('activeDropZone', DropZoneLocation, undefined),
    currentColumns: {},
  };
  return <ChartCreator {...props} />;
};

export const ChartCreatorWithDroppedColumns = () => {
  const props: ChartCreatorProps = {
    isDragging: boolean('isDragging', false),
    activeDropZone: select('activeDropZone', DropZoneLocation, undefined),
    currentColumns: {
      [DropZoneLocation.BOTTOM]: { dataFrameId: 1, dataFrameName: 'MyDF', columnName: 'id' },
      [DropZoneLocation.LEFT]: { dataFrameId: 1, dataFrameName: 'MyDF', columnName: 'name' },
    },
  };
  return <ChartCreator {...props} />;
};
