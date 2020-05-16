import { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';
import { useProject, useCharts } from '../../../store/selectors';
import { CreateNewChart } from '../../../components/charts/ChartPreview';
import { setCurrentProject } from '../../../store/current';

function Charts() {
  const router = useRouter();
  const projectId: number = +router.query.id!;
  const project = useProject(projectId);
  if (!project) {
    return <>Project not found.</>;
  }

  const dispatch = useDispatch();
  dispatch(setCurrentProject(projectId));

  const charts = useCharts(project);

  return (
    <>
      <CreateNewChart />
    </>
  );
}

export default connect()(Charts);
