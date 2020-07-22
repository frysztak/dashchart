import { useDispatch } from 'react-redux';
import { DataFrameContainer, saveDataFrame as saveDataFrameAction } from '../../../../store/project';
import { useCurrentDataFrame, useCurrentProject } from '../../../../store/hooks';
import {
  downloadDataFrame as downloadDataFrameAction,
  convertColumnType as convertColumnTypeAction,
  resetEditedDataFrame,
  setEditedDataFrame,
} from '../../../../store/current';
import { ErrorMessage } from '../../../../components/misc/ErrorMessage';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, Flex } from 'reflexbox';
import { LeftBoxShadow } from '../../../../components/misc/BoxShadow';
import { ColumnType, convertToDataTable, mapColumnType } from 'shared/DataFrame';
import { DataFrameInfoSidebar } from '../../../../components/dataframe/DataFrameInfoSidebar';
import DataTable from 'react-data-table-component';
import { styled } from '../../../../config/Theme';
import { useRouter } from 'next/router';
import { routes } from '../../../../config/routes';
import { Spinner } from '../../../../components/misc/Spinner';
import { IOStatus } from '../../../../store/common';

const StyledDataTable = styled(DataTable)`
  width: auto;
  margin-right: 16px;
`;

const customStyles = {
  headCells: {
    style: {
      fontSize: '16px',
    },
  },
};

function DataFramePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [project, projectState] = useCurrentProject();
  const [container, isNew] = useCurrentDataFrame();

  useEffect(() => {
    return () => {
      dispatch(resetEditedDataFrame());
    };
  }, []);

  if (projectState === IOStatus.LOADING) {
    return <Spinner />;
  }

  if (project === null) {
    return <ErrorMessage message={'Project not found.'} />;
  }

  if (container === null) {
    return <ErrorMessage message={'Data Frame not found.'} />;
  }

  const updateDataFrame = (newDataFrameContainer: DataFrameContainer) => {
    dispatch(setEditedDataFrame(newDataFrameContainer));
  };

  const downloadDataFrame = () => {
    dispatch(
      downloadDataFrameAction({
        projectId: project.id,
        dataFrameId: container.id,
        source: container.source,
      }),
    );
  };

  const saveDataFrame = async () => {
    await dispatch(
      saveDataFrameAction({
        projectId: project.id,
        container: container,
        isNew: isNew,
      }),
    );

    if (isNew && project.dataFrames.saveState.state === IOStatus.OK) {
      const route = routes.dataFrame(project.id, container.id);
      router.push(route.href, route.as);
    }
  };

  const convertColumnType = (columnName: string, columnType: ColumnType) => {
    dispatch(
      convertColumnTypeAction({
        columnName,
        columnType,
      }),
    );
  };

  const [columns, rows] = convertToDataTable(container.dataFrame);
  const styledColumns = columns.map((col, idx) => {
    const type: ColumnType | undefined = Object.values(container.dataFrame.columns)[idx]?.type;
    return {
      ...col,
      name: type ? `${col.name} :: ${mapColumnType(type)}` : col.name,
      sortable: true,
    };
  });

  return (
    <>
      <Head>
        <title>
          {project.name} :: {container?.dataFrame.name || 'new Data Frame'}
        </title>
      </Head>
      <Flex height={'100%'}>
        <Box flexGrow={1} overflowY={'auto'}>
          <StyledDataTable columns={styledColumns} data={rows} keyField={'__id'} noHeader customStyles={customStyles} />
        </Box>
        <Box>
          <LeftBoxShadow>
            <DataFrameInfoSidebar
              dataFrameContainer={container}
              update={updateDataFrame}
              onDownloadClick={downloadDataFrame}
              onSaveClick={saveDataFrame}
              onConvertType={convertColumnType}
            />
          </LeftBoxShadow>
        </Box>
      </Flex>
    </>
  );
}

export default DataFramePage;
