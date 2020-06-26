import { useRouter } from 'next/router';
import { useDataFrames } from '../../../store/selectors';
import { Flex, Box } from 'reflexbox';
import { routes } from '../../../config/routes';
import { useCurrentProject } from '../../../store/hooks';
import { Project } from '../../../store/project';
import React from 'react';
import Head from 'next/head';
import { ID } from '../../../store/state';
import { DataFrame } from 'shared/DataFrame';
import { DataFramePreview } from '../../../components/dataframe/DataFramePreview';
import { CreateNewCard } from '../../../components/misc/PreviewCard';

function DataFrames() {
  const router = useRouter();
  const project: Project | null = useCurrentProject();
  const dataFrames: DataFrame[] = useDataFrames(project);

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
        {dataFrames.map(df => (
          <Box m={5} marginTop={4} key={df.name}>
            <DataFramePreview dataFrame={df} onClick={navigateToDataFramePage} />
          </Box>
        ))}

        <Box m={5} marginTop={4}>
          <CreateNewCard label={'Create new Data Frame...'} onClick={navigateToDataFramePage} />
        </Box>
      </Flex>
    </>
  );
}

export default DataFrames;
