import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { DataFrameColumnList, DataFrameColumnListProps } from './DataFrameColumnList';
import { SampleDataFrame } from '../../utils/SampleDataFrame';

export default { title: 'DataFrameColumnList', decorators: [withKnobs] };

export const DataFrameColumnsListStory = () => {
  const props: DataFrameColumnListProps = {
    dataFrame: SampleDataFrame,
  };

  return <DataFrameColumnList {...props} />;
};
