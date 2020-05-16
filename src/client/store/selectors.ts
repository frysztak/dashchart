import { ID, AppState } from './state';
import { Project, ChartState } from './project';
import { useSelector } from 'react-redux';

export const useProject = (projectId: ID): Project | null =>
  useSelector((state: AppState) => (projectId in state.projects ? state.projects[projectId] : null));

export const useCurrentProject = (): Project | null =>
  useSelector((state: AppState) => (state.current.projectId !== null ? state.projects[state.current.projectId] : null));

export const useCharts = (project: Project): ChartState[] => Object.values(project.charts);
