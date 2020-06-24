import { useRouter } from 'next/router';
import { AppState, ID } from './state';
import { isNumeric } from 'shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentProject } from './current';
import { Project, ChartState } from './project';
import { useChartById, useCurrentProjectId } from './selectors';
import { resetCurrentColumns, setCurrentColumns } from './chartCreator';

export function useCurrentProject(): Project | null {
  const router = useRouter();
  const dispatch = useDispatch();

  const isProjectIdValid: boolean = 'projectId' in router.query && isNumeric(router.query.projectId);
  const projectId: ID | null = isProjectIdValid ? +router.query.projectId! : null;
  const currentProjectId: number | null = useCurrentProjectId();

  useEffect(() => {
    if (projectId !== null && projectId !== currentProjectId) {
      dispatch(setCurrentProject(projectId));
    }
  });

  return useSelector((state: AppState) => (projectId === null ? null : state.projects[projectId]));
}

export function useCurrentChart(): ChartState | null {
  const router = useRouter();
  const dispatch = useDispatch();

  const isNewChart: boolean = 'chartId' in router.query && router.query.chartId === 'new';
  const isChartIdValid: boolean = 'chartId' in router.query && isNumeric(router.query.chartId);
  const chartId: ID | null = isChartIdValid ? +router.query.chartId! : null;
  const chart: ChartState | null = useChartById(chartId);

  useEffect(() => {
    if (isNewChart) {
      dispatch(resetCurrentColumns());
    } else if (chartId !== null && chart) {
      dispatch(setCurrentColumns(chart.columns));
    }
  }, []);

  return chart;
}
