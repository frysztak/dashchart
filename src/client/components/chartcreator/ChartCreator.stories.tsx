import React from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { ActiveDropZone, ChartCreator, ChartCreatorProps } from './ChartCreator';

export default { title: 'ChartCreator', decorators: [withKnobs] };

export const RegularChartCreator = () => {
  const props: ChartCreatorProps = {
    isDragging: boolean('isDragging', false),
    activeDropZone: select('activeDropZone', ActiveDropZone, ActiveDropZone.NONE),
  };
  return <ChartCreator {...props} />;
};
