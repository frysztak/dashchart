import { useRouter } from 'next/router';
import { useCharts } from '../../../store/selectors';
import { CreateNewChart } from '../../../components/charts/ChartPreview';
import { Flex, Box } from 'reflexbox';
import { routes } from '../../../config/routes';
import { useCurrentProject } from '../../../store/hooks';
import { Project, ChartState } from '../../../store/project';

function Charts() {
  const router = useRouter();
  const project: Project | null = useCurrentProject();
  const charts: ChartState[] = project !== null ? useCharts(project) : [];

  if (project === null) {
    return <>Project not found.</>;
  }

  const navigateToNewChartPage = () => {
    const route = routes.newChart(project.id);
    router.push(route.href, route.as);
  };

  return (
    <Flex flexWrap={'wrap'}>
      <Box m={5}>
        <CreateNewChart onClick={navigateToNewChartPage} />
      </Box>
    </Flex>
  );
}

export default Charts;
