import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { DataFrameSidebarProps, DataFrameSidebar } from './DataFrameSidebar';
import { SampleDataFrame } from '../../utils/SampleDataFrame';

export default { title: 'DataFrame Sidebar', decorators: [withKnobs] };

export const DataFrameSidebarStory = () => {
  const frame = SampleDataFrame;
  const props: DataFrameSidebarProps = {
    dataFrames: [frame, frame, frame, frame],
  };

  return <DataFrameSidebar {...props} />;
};
