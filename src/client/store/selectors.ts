import { ID, AppState } from './state';
import { Project, ChartState, DataFrameContainer } from './project';
import { useSelector } from 'react-redux';
import { DataFrame } from 'shared/DataFrame';

export const useProjects = (): Project[] => useSelector((state: AppState) => Object.values(state.projects));

export const useProject = (projectId: ID): Project | null =>
  useSelector((state: AppState) => (projectId in state.projects ? state.projects[projectId] : null));

export const useCurrentProjectId = (): number | null => useSelector((state: AppState) => state.current.projectId);

export const useIsDraggingDroppedColumn = (): boolean =>
  useSelector((state: AppState) => state.current.isDraggingDroppedColumn);

export const useCurrentProjectFromStore = (): Project | null =>
  useSelector((state: AppState) => (state.current.projectId !== null ? state.projects[state.current.projectId] : null));

export const useCharts = (project: Project): ChartState[] => Object.values(project.charts);

export const useChartById = (chartId: ID | null): ChartState | null => {
  if (chartId === null) return null;
  const project: Project | null = useCurrentProjectFromStore();
  if (project === null) return null;
  return chartId in project.charts ? project.charts[chartId] : null;
};

export const useDataFrames = (project: Project | null): DataFrame[] =>
  project ? Object.values(project.dataFrames).map((s: DataFrameContainer) => s.dataFrame) : [];

export const useDataFrameContainers = (project: Project | null): DataFrameContainer[] =>
  project ? Object.values(project.dataFrames) : [];

export const useDataFrameById = (dataFrameId: ID | null): DataFrameContainer | null => {
  const project: Project | null = useCurrentProjectFromStore();
  if (project === null || dataFrameId === null) return null;
  return dataFrameId in project.dataFrames ? project.dataFrames[dataFrameId] : null;
};

export const useEditedDataFrame = (): DataFrameContainer | null =>
  useSelector((state: AppState) => state.current.editedDataFrame);

export const useChartCreator = () => useSelector((state: AppState) => state.chartCreator);
