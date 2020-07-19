import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ID } from './state';
import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { DataFrame, ColumnId } from 'shared/DataFrame';
import { UserEditableChartProps } from '../components/charts/common/Props';
import { http } from './http';
import { Project as PrismaProject, DataFrame as PrismaDataFrame, Chart as PrismaChart } from '@prisma/client';
import { pick } from 'lodash';
import { IOState, IOStatus } from './common';

export type ProjectsState = {
  projects: Record<ID, Project>;
  projectStats: Record<ID, ProjectStats>;
  state: IOStatus;
  errorMessage?: string;
  createProject: {
    state: IOStatus;
    errorMessage?: string;
  };
};

export type DataFramesState = {
  data: Record<ID, DataFrameContainer>;
  state: IOStatus;
  errorMessage?: string;
  saveState: IOState;
};

export type ChartsState = {
  data: Record<ID, ChartStateContainer>;
  state: IOStatus;
  errorMessage?: string;
};

export interface Project {
  name: string;
  id: number;
  dataFrames: DataFramesState;
  charts: ChartsState;
  dashboards: Record<ID, DashboardState>;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStats =
  | {
      status: IOStatus.ERROR | IOStatus.LOADING;
    }
  | {
      status: IOStatus.OK;
      values: {
        dataFrameCount: number;
        chartCount: number;
      };
    };

export interface DataFrameContainer {
  id: number;
  source: string;
  dataFrame: DataFrame;
  state: IOStatus;
  errorMessage?: string;
}

export interface ChartState {
  id: number;
  name: string;
  columns: DropZoneValues<ColumnId>;
  userProps: UserEditableChartProps[];
}

export interface ChartStateContainer {
  state: IOStatus;
  errorMessage?: string;
  data: ChartState;
}

export interface DashboardState {}

export const initialProjectsState: ProjectsState = {
  state: IOStatus.LOADING,
  projects: {},
  projectStats: {},
  createProject: {
    state: IOStatus.OK,
  },
};

export const createProject = createAsyncThunk('projects/create', async (name: string, thunkAPI) => {
  const projects = await http
    .url('/projects')
    .post({ name })
    .json<PrismaProject[]>();
  thunkAPI.dispatch(fetchProjects());
  return projects;
});

export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
  const projects = await http
    .url('/projects')
    .get()
    .json<PrismaProject[]>();
  return projects;
});

type Stats = PrismaProject & {
  dataFrameCount: number;
  chartCount: number;
};
export const fetchProjectStats = createAsyncThunk('projects/fetchStats', async (projectId: ID) => {
  return await http
    .url(`/project/${projectId}/stats`)
    .get()
    .json<Stats>();
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
  isNew: boolean;
}
export const saveDataFrame = createAsyncThunk('dataFrame/save', async (payload: SaveDataFramePayload) => {
  const {
    projectId,
    container: { id },
    isNew,
  } = payload;
  const dataFrame = isNew
    ? await http
        .url(`/project/${projectId}/dataframes`)
        .post({
          name: payload.container.dataFrame.name,
          columns: payload.container.dataFrame.columns,
          source: payload.container.source,
        })
        .json<PrismaDataFrame>()
    : await http
        .url(`/project/${projectId}/dataframe/${id}`)
        .put({
          id: payload.container.id,
          name: payload.container.dataFrame.name,
          source: payload.container.source,
          columns: payload.container.dataFrame.columns,
        })
        .json<PrismaDataFrame>();
  return dataFrame;
});

export const projectReducer = createReducer(initialProjectsState, builder =>
  builder
    .addCase(createProject.pending, (state, action) => {
      state.createProject.state = IOStatus.LOADING;
    })
    .addCase(createProject.fulfilled, (state, action) => {
      state.createProject.state = IOStatus.OK;
    })
    .addCase(createProject.rejected, (state, action) => {
      state.createProject.state = IOStatus.ERROR;
      state.createProject.errorMessage = action.error.message;
    })
    .addCase(fetchProjects.pending, (state, action) => {
      state.projects = {};
      state.state = IOStatus.LOADING;
    })
    .addCase(fetchProjects.fulfilled, (state, action) => {
      const projects: PrismaProject[] = action.payload;
      state.state = IOStatus.OK;
      state.projects = projects.reduce(
        (acc: Record<ID, Project>, project: PrismaProject): Record<ID, Project> => ({
          ...acc,
          [project.id]: {
            id: project.id,
            name: project.name,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            dataFrames: {
              state: IOStatus.LOADING,
              data: {},
              saveState: {
                state: IOStatus.OK,
              },
            },
            charts: {
              state: IOStatus.LOADING,
              data: {},
            },
            dashboards: {},
          },
        }),
        {},
      );
    })
    .addCase(fetchProjects.rejected, (state, action) => {
      state.projects = {};
      state.state = IOStatus.ERROR;
    })
    .addCase(fetchDataFrames.pending, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projects[projectId].dataFrames.state = IOStatus.LOADING;
      state.projects[projectId].dataFrames.data = {};
    })
    .addCase(fetchProjectStats.pending, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projectStats[projectId] = {
        status: IOStatus.LOADING,
      };
    })
    .addCase(fetchProjectStats.fulfilled, (state, action) => {
      const projectId: ID = action.meta.arg;
      const { chartCount, dataFrameCount } = action.payload;
      state.projectStats[projectId] = {
        status: IOStatus.OK,
        values: {
          chartCount,
          dataFrameCount,
        },
      };
    })
    .addCase(fetchProjectStats.rejected, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projectStats[projectId] = {
        status: IOStatus.ERROR,
      };
    })
    .addCase(fetchDataFrames.fulfilled, (state, action) => {
      const projectId: ID = action.meta.arg;
      const dataFrames: PrismaDataFrame[] = action.payload;
      state.projects[projectId].dataFrames.state = IOStatus.OK;
      state.projects[projectId].dataFrames.data = dataFrames.reduce(
        (acc: Record<ID, DataFrameContainer>, df: PrismaDataFrame) => ({
          ...acc,
          [df.id]: {
            id: df.id,
            source: df.source,
            state: IOStatus.OK,
            // TODO: use something like io-ts to parse the json
            dataFrame: pick((df as unknown) as DataFrame, ['id', 'name', 'columns']),
          },
        }),
        {},
      );
    })
    .addCase(fetchDataFrames.rejected, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projects[projectId].dataFrames.state = IOStatus.ERROR;
      state.projects[projectId].dataFrames.data = {};
    })
    .addCase(saveDataFrame.pending, (state, action) => {
      const { projectId } = action.meta.arg;
      state.projects[projectId].dataFrames.saveState.state = IOStatus.LOADING;
    })
    .addCase(saveDataFrame.fulfilled, (state, action) => {
      const {
        projectId,
        container: { id },
      } = action.meta.arg;
      const dataFrame: PrismaDataFrame = action.payload;
      state.projects[projectId].dataFrames.data[id] = {
        state: IOStatus.OK,
        source: dataFrame.source,
        id: dataFrame.id,
        // TODO: use something like io-ts to parse the json
        dataFrame: pick((dataFrame as unknown) as DataFrame, ['id', 'name', 'columns']),
      };
      state.projects[projectId].dataFrames.saveState.state = IOStatus.OK;
    })
    .addCase(saveDataFrame.rejected, (state, action) => {
      const {
        projectId,
        container: { id },
      } = action.meta.arg;
      // state.projects[projectId].dataFrames.data[id].state = IOStatus.ERROR;
      state.projects[projectId].dataFrames.saveState.state = IOStatus.ERROR;
      state.projects[projectId].dataFrames.saveState.errorMessage = action.error.message;
    })
    .addCase(fetchCharts.pending, (state, action) => {
      const projectId: ID = action.meta.arg;
      state.projects[projectId].charts = {
        state: IOStatus.LOADING,
        data: {},
      };
    })
    .addCase(fetchCharts.fulfilled, (state, action) => {
      const projectId: ID = action.meta.arg;
      const charts: PrismaChart[] = action.payload;
      state.projects[projectId].charts.state = IOStatus.OK;
      state.projects[projectId].charts.data = charts.reduce(
        (acc: Record<ID, ChartStateContainer>, ch: PrismaChart) => ({
          ...acc,
          [ch.id]: {
            state: IOStatus.OK,
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
        state: IOStatus.ERROR,
        data: {},
      };
    })
    .addCase(saveChart.pending, (state, action) => {
      const { projectId, chart } = action.meta.arg;
      state.projects[projectId].charts.data[chart.id].state = IOStatus.LOADING;
    })
    .addCase(saveChart.fulfilled, (state, action) => {
      const {
        projectId,
        chart: { id },
      } = action.meta.arg;
      const chart: PrismaChart = action.payload;
      state.projects[projectId].charts.data[id] = {
        state: IOStatus.OK,
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
      state.projects[projectId].charts.data[chart.id].state = IOStatus.ERROR;
      state.projects[projectId].charts.data[chart.id].errorMessage = action.error.message;
    }),
);
