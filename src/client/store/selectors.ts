import { ID, AppState } from './state';
import { Project, ChartState, DataFrameContainer, ProjectsState, DataFramesState } from './project';
import { useSelector } from 'react-redux';
import { DataFrame } from 'shared/DataFrame';

export const useProjects = (): ProjectsState => useSelector((state: AppState) => state.projects);

export const useProject = (projectId: ID): Project | null =>
  useSelector((state: AppState) => (projectId in state.projects.projects ? state.projects.projects[projectId] : null));

export const useCurrentProjectId = (): number | null => useSelector((state: AppState) => state.current.projectId);

export const useIsDraggingDroppedColumn = (): boolean =>
  useSelector((state: AppState) => state.current.isDraggingDroppedColumn);

export const useCurrentProjectFromStore = (): Project | null =>
  useSelector((state: AppState) => {
    const projectId = state.current.projectId;
    // prettier-ignore
    return projectId !== null
      ? projectId in state.projects.projects
        ? state.projects.projects[projectId]
        : null
      : null;
  });

export const useCharts = (project: Project): ChartState[] => Object.values(project.charts);

export const useChartById = (chartId: ID | null): ChartState | null => {
  const project: Project | null = useCurrentProjectFromStore();
  if (chartId === null || project === null) return null;
  return chartId in project.charts ? project.charts[chartId] : null;
};

export const useDataFrames = (project: Project | null): DataFrame[] =>
  project ? Object.values(project.dataFrames.data).map((s: DataFrameContainer) => s.dataFrame) : [];

export const useDataFramesState = (project: Project | null): DataFramesState | null =>
  project ? project.dataFrames : null;

export const useDataFrameContainers = (project: Project | null) =>
  project ? Object.values(project.dataFrames.data) : [];

export const useDataFrameById = (dataFrameId: ID | null): DataFrameContainer | null => {
  const project: Project | null = useCurrentProjectFromStore();
  if (project === null || dataFrameId === null) return null;
  return dataFrameId in project.dataFrames.data ? project.dataFrames.data[dataFrameId] : null;
};

export const useEditedDataFrame = (): DataFrameContainer | null =>
  useSelector((state: AppState) => state.current.editedDataFrame);

export const useChartCreator = () => useSelector((state: AppState) => state.chartCreator);
