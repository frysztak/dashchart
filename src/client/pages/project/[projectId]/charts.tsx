import { useRouter } from 'next/router';
import { useCharts, useDataFramesState } from '../../../store/selectors';
import { ChartPreview } from '../../../components/charts/ChartPreview';
import { Box, Flex } from 'reflexbox';
import { routes } from '../../../config/routes';
import { useCurrentProject } from '../../../store/hooks';
import { ChartState } from '../../../store/project';
import React from 'react';
import Head from 'next/head';
import { ID } from '../../../store/state';
import { CreateNewCard } from '../../../components/misc/PreviewCard';
import { Spinner } from '../../../components/misc/Spinner';
import { IOStatus } from '../../../store/common';

function Charts() {
  const router = useRouter();
  const [project, projectState] = useCurrentProject();
  const dataFramesState = useDataFramesState(project);
  const charts: ChartState[] = project !== null ? useCharts(project) : [];

  if (projectState === IOStatus.LOADING || dataFramesState?.state === IOStatus.LOADING) {
    return <Spinner />;
  }

  if (project === null) {
    return <>Project not found.</>;
  }

  const navigateToChartPage = (chartId?: ID) => () => {
    const route = chartId === undefined ? routes.newChart(project.id) : routes.chart(project.id, chartId);
    router.push(route.href, route.as);
  };

  return (
    <>
      <Head>
        <title>{project.name} :: charts</title>
      </Head>
      <Flex flexWrap={'wrap'}>
        {charts.map(chart => (
          <Box m={5} marginTop={4} key={chart.id}>
            <ChartPreview {...chart} projectId={project.id} onClick={navigateToChartPage(chart.id)} />
          </Box>
        ))}

        <Box m={5} marginTop={4}>
          <CreateNewCard label={'Create new chart...'} onClick={navigateToChartPage()} />
        </Box>
      </Flex>
    </>
  );
}

export default Charts;
