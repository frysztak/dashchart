import React from 'react';
import { number, select, withKnobs, boolean } from '@storybook/addon-knobs';
import { ChartCreator, ChartCreatorProps } from './ChartCreator';

export default { title: 'ChartCreator', decorators: [withKnobs] };

export const RegularChartCreator = () => {
  const props: ChartCreatorProps = {
    isDragging: boolean('isDragging', false),
  };
  return <ChartCreator {...props} />;
};
