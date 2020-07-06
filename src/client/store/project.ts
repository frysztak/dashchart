import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ID } from './state';
import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { DataFrame, ColumnId } from 'shared/DataFrame';
import { UserEditableChartProps } from '../components/charts/common/Props';
import { http } from './http';
import { Project as PrismaProject } from '@prisma/client';

export type ProjectsState = {
  projects: Record<ID, Project>;
  state: LoadingState;
  errorMessage?: string;
};

export interface Project {
  name: string;
  id: number;
  dataFrames: Record<ID, DataFrameContainer>;
  charts: Record<ID, ChartState>;
  dashboards: Record<ID, DashboardState>;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface DataFrameContainer {
  id: number;
  source: string;
  dataFrame: DataFrame;
  state: LoadingState;
  errorMessage?: string;
}

export interface ChartState {
  id: number;
  name: string;
  columns: DropZoneValues<ColumnId>;
  userProps: UserEditableChartProps[];
}

export interface DashboardState {}

export const initialProjectsState: ProjectsState = {
  state: LoadingState.IDLE,
  projects: {},
};

export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
  const projects = await http
    .url('/projects')
    .get()
    .json<PrismaProject[]>();
  return projects;
});

export interface SaveChartPayload {
  projectId: ID;
  chart: ChartState;
}
export const saveChart = createAction<SaveChartPayload>('chart/save');

export interface SaveDataFramePayload {
  projectId: ID;
  container: DataFrameContainer;
}
export const saveDataFrame = createAction<SaveDataFramePayload>('dataFrame/save');

export const projectReducer = createReducer(initialProjectsState, builder =>
  builder
    .addCase(saveChart, (state, action) => {
      const { projectId, chart } = action.payload;
      state.projects[projectId].charts[chart.id] = chart;
    })
    .addCase(saveDataFrame, (state, action) => {
      const { projectId, container } = action.payload;
      state.projects[projectId].dataFrames[container.id] = container;
    })
    .addCase(fetchProjects.pending, (state, action) => {
      return { projects: {}, state: LoadingState.LOADING };
    })
    .addCase(fetchProjects.fulfilled, (state, action) => {
      const projects: PrismaProject[] = action.payload;
      return {
        state: LoadingState.IDLE,
        projects: projects.reduce(
          (acc: Record<ID, Project>, project: PrismaProject): Record<ID, Project> => ({
            ...acc,
            [project.id]: {
              id: project.id,
              name: project.name,
              dataFrames: {},
              charts: {},
              dashboards: {},
            },
          }),
          {},
        ),
      };
    })
    .addCase(fetchProjects.rejected, (state, action) => {
      return { projects: {}, state: LoadingState.ERROR };
    }),
);
