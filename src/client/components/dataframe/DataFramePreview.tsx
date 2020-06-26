import { convertToDataTable, DataFrame } from 'shared/DataFrame';
import { PreviewCard } from '../misc/PreviewCard';
import React from 'react';
import DataTable from 'react-data-table-component';
import { styled } from '../../config/Theme';

export type DataFramePreviewProps = {
  dataFrame: DataFrame;
  onClick: () => void;
};

const StyledDataTable = styled(DataTable)`
  overflow-x: hidden;
  margin-left: 8px;
  margin-right: 8px;
  width: unset;
`;

export function DataFramePreview(props: DataFramePreviewProps) {
  const { dataFrame, onClick } = props;

  const [columns, rows] = convertToDataTable(dataFrame);
  const styledColumns = columns.map(col => ({
    ...col,
    grow: 0,
    compact: true,
  }));

  return (
    <PreviewCard title={dataFrame.name} onClick={onClick}>
      <StyledDataTable columns={styledColumns} data={rows} keyField={'__id'} dense noHeader />
    </PreviewCard>
  );
}
