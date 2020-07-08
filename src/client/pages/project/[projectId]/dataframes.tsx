import { useRouter } from 'next/router';
import { useDataFramesState } from '../../../store/selectors';
import { Box, Flex } from 'reflexbox';
import { routes } from '../../../config/routes';
import { useCurrentProject } from '../../../store/hooks';
import { DataFramesState, LoadingState } from '../../../store/project';
import React from 'react';
import Head from 'next/head';
import { ID } from '../../../store/state';
import { DataFramePreview } from '../../../components/dataframe/DataFramePreview';
import { CreateNewCard } from '../../../components/misc/PreviewCard';
import { Spinner } from '../../../components/misc/Spinner';
import { ErrorMessage } from '../../../components/misc/ErrorMessage';

function DataFrames() {
  const router = useRouter();
  const [project, projectState] = useCurrentProject();
  const dataFrames: DataFramesState | null = useDataFramesState(project);

  if (projectState === LoadingState.LOADING) {
    return <Spinner />;
  }

  if (project === null) {
    return <>Project not found.</>;
  }

  if (dataFrames === null) {
    return <>Project not found.</>;
  }

  const navigateToDataFramePage = (dataFrameId?: ID) => () => {
    const route =
      dataFrameId === undefined ? routes.newDataFrame(project.id) : routes.dataFrame(project.id, dataFrameId);
    router.push(route.href, route.as);
  };

  const body = () => {
    switch (dataFrames.state) {
      case LoadingState.LOADING:
        return <Spinner />;
      case LoadingState.IDLE:
        return (
          <Flex flexWrap={'wrap'}>
            {Object.values(dataFrames.data).map(dfContainer => (
              <Box m={5} marginTop={4} key={dfContainer.dataFrame.name}>
                <DataFramePreview dataFrame={dfContainer.dataFrame} onClick={navigateToDataFramePage(dfContainer.id)} />
              </Box>
            ))}

            <Box m={5} marginTop={4}>
              <CreateNewCard label={'Create new Data Frame...'} onClick={navigateToDataFramePage()} />
            </Box>
          </Flex>
        );
      case LoadingState.ERROR:
        return <ErrorMessage message={dataFrames.errorMessage || 'Unknown error'} />;
    }
  };

  return (
    <>
      <Head>
        <title>{project.name} :: data frames</title>
      </Head>
      {body()}
    </>
  );
}

export default DataFrames;
