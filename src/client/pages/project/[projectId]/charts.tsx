import { useRouter } from 'next/router';
import { useCharts } from '../../../store/selectors';
import { ChartPreview, CreateNewChart } from '../../../components/charts/ChartPreview';
import { Flex, Box } from 'reflexbox';
import { routes } from '../../../config/routes';
import { useCurrentProject } from '../../../store/hooks';
import { Project, ChartState } from '../../../store/project';
import React from 'react';
import Head from 'next/head';
import { ID } from '../../../store/state';

function Charts() {
  const router = useRouter();
  const project: Project | null = useCurrentProject();
  const charts: ChartState[] = project !== null ? useCharts(project) : [];

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
          <CreateNewChart onClick={navigateToChartPage()} />
        </Box>
      </Flex>
    </>
  );
}

export default Charts;
