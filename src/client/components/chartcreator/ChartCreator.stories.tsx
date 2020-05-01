import React from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { DropZoneLocation, ChartCreator, ChartCreatorProps } from './ChartCreator';

export default { title: 'ChartCreator', decorators: [withKnobs] };

export const RegularChartCreator = () => {
  const props: ChartCreatorProps = {
    isDragging: boolean('isDragging', false),
    activeDropZone: select('activeDropZone', DropZoneLocation, undefined),
    currentColumns: {
      [DropZoneLocation.BOTTOM]: { dataFrameName: 'My DF', columnName: 'id' },
      [DropZoneLocation.LEFT]: { dataFrameName: 'My DF', columnName: 'name' },
    },
  };
  return <ChartCreator {...props} />;
};