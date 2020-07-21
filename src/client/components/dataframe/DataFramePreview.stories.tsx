import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { DataFramePreview } from './DataFramePreview';
import { SampleDataFrame } from '../../utils/SampleDataFrame';

export default { title: 'DataFrame Preview', decorators: [withKnobs] };

export const DataFramePreviewStory = () => {
  return <DataFramePreview dataFrame={SampleDataFrame} onClick={() => {}} />;
};
