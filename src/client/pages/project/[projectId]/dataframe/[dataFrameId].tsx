import { useDispatch } from 'react-redux';
import { DataFrameContainer, Project } from '../../../../store/project';
import { useCurrentProject } from '../../../../store/hooks';
import { useRouter } from 'next/router';
import { isNumeric } from 'shared/utils/index';
import { ID } from '../../../../store/state';
import { useDataFrameById } from '../../../../store/selectors';
import { ErrorMessage } from '../../../../components/misc/ErrorMessage';
import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Flex } from 'reflexbox';
import { LeftBoxShadow } from '../../../../components/misc/BoxShadow';
import { convertToDataTable } from 'shared/DataFrame/index';
import { DataFrameInfoSidebar } from '../../../../components/dataframe/DataFrameInfoSidebar';
import DataTable from 'react-data-table-component';
import { styled } from '../../../../config/Theme';
import {
  saveDataFrame as saveDataFrameAction,
  downloadDataFrame as downloadDataFrameAction,
} from '../../../../store/project';

const StyledDataTable = styled(DataTable)`
  width: auto;
  margin-right: 16px;
`;

function DataFramePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const project: Project | null = useCurrentProject();

  const isNewDataFrame: boolean = 'dataFrameId' in router.query && router.query.dataFrameId === 'new';
  const isChartIdValid: boolean = 'dataFrameId' in router.query && isNumeric(router.query.dataFrameId);
  const dataFrameId: ID | null = isChartIdValid ? +router.query.dataFrameId! : null;
  const dfContainerFromStore: DataFrameContainer | null = useDataFrameById(dataFrameId);

  const [dfContainer, setDFContainer] = useState(
    dfContainerFromStore ??
      ({
        id: dataFrameId,
        source: '',
        dataFrame: {
          name: 'New Data Frame',
        },
      } as DataFrameContainer),
  );

  if (project === null) {
    return <ErrorMessage message={'Project not found.'} />;
  }

  if (dfContainer === null && !isNewDataFrame) {
    return <ErrorMessage message={'Data Frame not found.'} />;
  }

  const updateDataFrame = (newDataFrameContainer: DataFrameContainer) => {
    setDFContainer(newDataFrameContainer);
  };

  const downloadDataFrame = () => {
    dispatch(
      downloadDataFrameAction({
        projectId: project.id,
        dataFrameId: dfContainer.id,
        source: dfContainer.source,
      }),
    );
  };

  const saveDataFrame = () => {
    dispatch(
      saveDataFrameAction({
        projectId: project.id,
        container: dfContainer,
      }),
    );
  };

  const [columns, rows] = convertToDataTable(dfContainer.dataFrame);
  const styledColumns = columns.map(col => ({
    ...col,
    sortable: true,
  }));

  return (
    <>
      <Head>
        <title>
          {project.name} :: {dfContainer?.dataFrame.name || 'new Data Frame'}
        </title>
      </Head>
      <Flex height={'100%'}>
        <Box flexGrow={1}>
          <StyledDataTable columns={styledColumns} data={rows} keyField={'__id'} noHeader />
        </Box>
        <Box>
          <LeftBoxShadow>
            <DataFrameInfoSidebar
              dataFrameContainer={dfContainer}
              update={updateDataFrame}
              onDownloadClick={downloadDataFrame}
              onSaveClick={saveDataFrame}
            />
          </LeftBoxShadow>
        </Box>
      </Flex>
    </>
  );
}

export default DataFramePage;
