import { useRouter } from 'next/router';
import { useDataFrameContainers } from '../../../store/selectors';
import { Flex, Box } from 'reflexbox';
import { routes } from '../../../config/routes';
import { useCurrentProject } from '../../../store/hooks';
import { Project, DataFrameContainer } from '../../../store/project';
import React from 'react';
import Head from 'next/head';
import { ID } from '../../../store/state';
import { DataFramePreview } from '../../../components/dataframe/DataFramePreview';
import { CreateNewCard } from '../../../components/misc/PreviewCard';

function DataFrames() {
  const router = useRouter();
  const project: Project | null = useCurrentProject();
  const dataFrames: DataFrameContainer[] = useDataFrameContainers(project);

  if (project === null) {
    return <>Project not found.</>;
  }

  const navigateToDataFramePage = (dataFrameId?: ID) => () => {
    const route =
      dataFrameId === undefined ? routes.newDataFrame(project.id) : routes.dataFrame(project.id, dataFrameId);
    router.push(route.href, route.as);
  };

  return (
    <>
      <Head>
        <title>{project.name} :: data frames</title>
      </Head>
      <Flex flexWrap={'wrap'}>
        {dataFrames.map(dfContainer => (
          <Box m={5} marginTop={4} key={dfContainer.dataFrame.name}>
            <DataFramePreview dataFrame={dfContainer.dataFrame} onClick={navigateToDataFramePage(dfContainer.id)} />
          </Box>
        ))}

        <Box m={5} marginTop={4}>
          <CreateNewCard label={'Create new Data Frame...'} onClick={navigateToDataFramePage()} />
        </Box>
      </Flex>
    </>
  );
}

export default DataFrames;
