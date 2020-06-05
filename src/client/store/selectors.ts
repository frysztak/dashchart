import { ID, AppState } from './state';
import { Project, ChartState, DataFrameState } from './project';
import { useSelector } from 'react-redux';
import { DataFrame } from 'shared/DataFrame';

export const useProjects = (): Project[] => useSelector((state: AppState) => Object.values(state.projects));

export const useProject = (projectId: ID): Project | null =>
  useSelector((state: AppState) => (projectId in state.projects ? state.projects[projectId] : null));

export const useCurrentProjectId = (): number | null => useSelector((state: AppState) => state.current.projectId);

export const useCurrentProjectFromStore = (): Project | null =>
  useSelector((state: AppState) => (state.current.projectId !== null ? state.projects[state.current.projectId] : null));

export const useCharts = (project: Project): ChartState[] => Object.values(project.charts);

export const useDataFrames = (project: Project | null): DataFrame[] =>
  project ? Object.values(project.dataFrames).map((s: DataFrameState) => s.dataFrame) : [];

export const useChartCreator = () => useSelector((state: AppState) => state.chartCreator);
