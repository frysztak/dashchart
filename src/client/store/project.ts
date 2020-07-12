import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ID } from './state';
import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { DataFrame, ColumnId } from 'shared/DataFrame';
import { UserEditableChartProps } from '../components/charts/common/Props';
import { http } from './http';
import { Project as PrismaProject, DataFrame as PrismaDataFrame, Chart as PrismaChart } from '@prisma/client';

export type ProjectsState = {
  projects: Record<ID, Project>;
  state: LoadingState;
  errorMessage?: string;
};

export type DataFramesState = {
  data: Record<ID, DataFrameContainer>;
  state: LoadingState;
  errorMessage?: string;
};

export type ChartsState = {
  data: Record<ID, ChartStateContainer>;
  state: LoadingState;
  errorMessage?: string;
};

export interface Project {
  name: string;
  id: number;
  dataFrames: DataFramesState;
  charts: ChartsState;
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

export interface ChartStateContainer {
  state: LoadingState;
  errorMessage?: string;
  data: ChartState;
}

export interface DashboardState {}

export const initialProjectsState: ProjectsState = {
  state: LoadingState.LOADING,
  projects: {},
};

export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
  const projects = await http
    .url('/projects')
    .get()
    .json<PrismaProject[]>();
  return projects;
});

export const fetchDataFrames = createAsyncThunk('dataFrames/fetch', async (projectId: ID) => {
  const dataFrames = await http
    .url(`/project/${projectId}/dataframes`)
    .get()
    .json<PrismaDataFrame[]>();
  return dataFrames;
});

export const fetchCharts = createAsyncThunk('charts/fetch', async (projectId: ID) => {
  const charts = await http
    .url(`/project/${projectId}/charts`)
    .get()
    .json<PrismaChart[]>();
  return charts;
});

export interface SaveChartPayload {
  projectId: ID;
  chart: ChartState;
}
export const saveChart = createAsyncThunk('chart/save', async (payload: SaveChartPayload) => {
  const { projectId, chart } = payload;
  return await http
    .url(`/project/${projectId}/chart/${chart.id}`)
    .put({
      name: chart.name,
      columns: chart.columns,
      props: chart.userProps,
    })
    .json<PrismaChart>();
});

export interface SaveDataFramePayload {
  projectId: ID;
  container: DataFrameContainer;
}
export const saveDataFrame = createAsyncThunk('dataFrame/save', async (payload: SaveDataFramePayload) => {
  const {
    projectId,
    container: { id },
  } = payload;
  const dataFrame = await http
    .url(`/project/${projectId}/dataframe/${id}`)
    .put(payload.container.dataFrame)
    .json<PrismaDataFrame>();
  return dataFrame;
});

export const projectReducer = createReducer(initialProjectsState, builder =>
  builder
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
              dataFrames: {
                state: LoadingState.LOADING,
                data: {},
              },
              charts: {
                state: LoadingState.LOADING,
                data: {},
              },
              dashboards: {},
            },
          }),
          {},
        ),
      };
    })
    .addCase(fetchProjects.rejected, (state, action) => {
      return { projects: {}, state: LoadingState.ERROR };
    })
    .addCase(fetchDataFrames.pending, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projects[projectId].dataFrames = {
        state: LoadingState.LOADING,
        data: {},
      };
    })
    .addCase(fetchDataFrames.fulfilled, (state, action) => {
      const projectId: ID = action.meta.arg;
      const dataFrames: PrismaDataFrame[] = action.payload;
      state.projects[projectId].dataFrames.state = LoadingState.IDLE;
      state.projects[projectId].dataFrames.data = dataFrames.reduce(
        (acc: Record<ID, DataFrameContainer>, df: PrismaDataFrame) => ({
          ...acc,
          [df.id]: {
            id: df.id,
            source: df.source,
            state: LoadingState.IDLE,
            // TODO: use something like io-ts to parse the json
            dataFrame: (df as unknown) as DataFrame,
          },
        }),
        {},
      );
    })
    .addCase(fetchDataFrames.rejected, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projects[projectId].dataFrames = {
        state: LoadingState.ERROR,
        data: {},
      };
    })
    .addCase(saveDataFrame.pending, (state, action) => {
      const {
        projectId,
        container: { id },
      } = action.meta.arg;
      state.projects[projectId].dataFrames.data[id].state = LoadingState.LOADING;
    })
    .addCase(saveDataFrame.fulfilled, (state, action) => {
      const {
        projectId,
        container: { id },
      } = action.meta.arg;
      const dataFrame: PrismaDataFrame = action.payload;
      state.projects[projectId].dataFrames.data[id] = {
        state: LoadingState.IDLE,
        source: dataFrame.source,
        id: dataFrame.id,
        // TODO: use something like io-ts to parse the json
        dataFrame: (dataFrame as unknown) as DataFrame,
      };
    })
    .addCase(saveDataFrame.rejected, (state, action) => {
      const {
        projectId,
        container: { id },
      } = action.meta.arg;
      state.projects[projectId].dataFrames.data[id].state = LoadingState.ERROR;
    })
    .addCase(fetchCharts.pending, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projects[projectId].charts = {
        state: LoadingState.LOADING,
        data: {},
      };
    })
    .addCase(fetchCharts.fulfilled, (state, action) => {
      const projectId: ID = action.meta.arg;
      const charts: PrismaChart[] = action.payload;
      state.projects[projectId].charts.state = LoadingState.IDLE;
      state.projects[projectId].charts.data = charts.reduce(
        (acc: Record<ID, ChartStateContainer>, ch: PrismaChart) => ({
          ...acc,
          [ch.id]: {
            state: LoadingState.IDLE,
            data: {
              id: ch.id,
              name: ch.name,
              // TODO: use something like io-ts to parse the json
              columns: (ch.columns as unknown) as DropZoneValues<ColumnId>,
              userProps: (ch.props as unknown) as UserEditableChartProps[],
            },
          },
        }),
        {},
      );
    })
    .addCase(fetchCharts.rejected, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projects[projectId].charts = {
        state: LoadingState.ERROR,
        data: {},
      };
    })
    .addCase(saveChart.pending, (state, action) => {
      const { projectId, chart } = action.meta.arg;
      state.projects[projectId].charts.data[chart.id].state = LoadingState.LOADING;
    })
    .addCase(saveChart.fulfilled, (state, action) => {
      const {
        projectId,
        chart: { id },
      } = action.meta.arg;
      const chart: PrismaChart = action.payload;
      state.projects[projectId].charts.data[id] = {
        state: LoadingState.IDLE,
        data: {
          id: chart.id,
          name: chart.name,
          columns: chart.columns as DropZoneValues<ColumnId>,
          userProps: (chart.props as unknown) as UserEditableChartProps[],
        },
      };
    })
    .addCase(saveChart.rejected, (state, action) => {
      const { projectId, chart } = action.meta.arg;
      console.error(action.error);
      state.projects[projectId].charts.data[chart.id].state = LoadingState.ERROR;
      state.projects[projectId].charts.data[chart.id].errorMessage = action.error.message;
    }),
);
