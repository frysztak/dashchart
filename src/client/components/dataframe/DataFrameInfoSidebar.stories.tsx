import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { SampleDataFrame } from '../../utils/SampleDataFrame';
import { DataFrameInfoSidebar } from './DataFrameInfoSidebar';
import { DataFrameContainer } from '../../store/project';
import { IOStatus } from '../../store/common';
import { ColumnType, inferColumnTypes } from 'shared/DataFrame';

export default { title: 'DataFrame Info Sidebar', decorators: [withKnobs] };

export const DataFrameInfoSidebarPreview = () => {
  const onUpdate = (newDF: DataFrameContainer) => {
    console.log('newDF', newDF);
  };
  const onDownloadClick = () => {
    console.log('onDownloadClick');
  };
  const onSaveClick = () => {
    console.log('onSaveClick');
  };
  const onConvertType = (columnName: string, newType: ColumnType) => {
    console.log('onConvertType', columnName, newType);
  };
  const container: DataFrameContainer = {
    dataFrame: inferColumnTypes(SampleDataFrame),
    id: 1,
    source: 'http://aaa.pl/file.csv',
    state: select('state', IOStatus, IOStatus.OK),
  };
  return (
    <DataFrameInfoSidebar
      dataFrameContainer={container}
      update={onUpdate}
      onDownloadClick={onDownloadClick}
      onSaveClick={onSaveClick}
      onConvertType={onConvertType}
    />
  );
};
