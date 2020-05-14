import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { CreateNewChart } from './ChartPreview';

export default { title: 'Chart Preview', decorators: [withKnobs] };

export const CreateNewChartStory = () => {
  return <CreateNewChart />;
};
