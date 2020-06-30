import { DataFrame } from 'shared/DataFrame';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ID } from './state';
import { ColumnType } from '../../shared/DataFrame';
import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { ColumnId } from 'shared/DataFrame/index';
import { UserEditableChartProps } from '../components/charts/common/Props';
import { CSVLoader } from 'shared/loaders/CSV';
import { Result, takeRight } from 'shared/utils';
import { isLeft } from 'fp-ts/es6/Either';

export type Projects = Record<ID, Project>;

export interface Project {
  name: string;
  id: number;
  dataFrames: Record<ID, DataFrameContainer>;
  charts: Record<ID, ChartState>;
  dashboards: Record<ID, DashboardState>;
}

export enum DataFrameLoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface DataFrameContainer {
  id: number;
  source: string;
  dataFrame: DataFrame;
  state: DataFrameLoadingState;
}

export interface ChartState {
  id: number;
  name: string;
  columns: DropZoneValues<ColumnId>;
  userProps: UserEditableChartProps[];
}

export interface DashboardState {}

export const initialProjects: Projects = {
  1: {
    name: 'My Project',
    id: 1,
    dataFrames: {
      1: {
        id: 1,
        source: '',
        state: DataFrameLoadingState.IDLE,
        dataFrame: {
          name: 'My DF',
          columns: {
            id: {
              type: ColumnType.STRING,
              values: ['1', '2', '3', '4', '5'],
            },
            first_name: {
              type: ColumnType.STRING,
              values: ['Prentiss', 'Bessie', 'Tybi', 'Felix', 'Gay'],
            },
            last_name: {
              type: ColumnType.STRING,
              values: ['Passey', 'Docker', 'Fantini', 'Freak', 'Cutchee'],
            },
            email: {
              type: ColumnType.STRING,
              values: [
                'ppassey0@amazonaws.com',
                'bdocker1@pagesperso-orange.fr',
                'tfantini2@reference.com',
                'ffreak3@google.nl',
                'gcutchee4@ifeng.com',
              ],
            },
            numbers: {
              type: ColumnType.NUMBER,
              values: [10, 20, 30, 40, 50],
            },
          },
        },
      },
    },
    charts: {},
    dashboards: {},
  },
};

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

export interface DownloadDataFramePayload {
  projectId: ID;
  dataFrameId: ID;
  source: string;
}
export const downloadDataFrame = createAsyncThunk(
  'dataFrame/download',
  async (payload: DownloadDataFramePayload, thunkAPI) => {
    const loader = new CSVLoader();
    debugger;
    const task = loader.loadUrl(payload.source);
    const result: Result<DataFrame> = await task();
    console.log('result', result);
    if (isLeft(result)) {
      return thunkAPI.rejectWithValue(result.left);
    }

    return takeRight(result);
  },
);

export const projectReducer = createReducer(initialProjects, builder =>
  builder
    .addCase(saveChart, (state, action) => {
      const { projectId, chart } = action.payload;
      state[projectId].charts[chart.id] = chart;
    })
    .addCase(saveDataFrame, (state, action) => {
      const { projectId, container } = action.payload;
      state[projectId].dataFrames[container.id] = container;
    })
    .addCase(downloadDataFrame.pending, (state, action) => {
      const { projectId, dataFrameId } = action.meta.arg;
      state[projectId].dataFrames[dataFrameId].state = DataFrameLoadingState.LOADING;
    })
    .addCase(downloadDataFrame.fulfilled, (state, action) => {
      const dataFrame: DataFrame = action.payload;
      const { projectId, dataFrameId } = action.meta.arg;
      state[projectId].dataFrames[dataFrameId].state = DataFrameLoadingState.IDLE;
      state[projectId].dataFrames[dataFrameId].dataFrame = dataFrame;
    })
    .addCase(downloadDataFrame.rejected, (state, action) => {
      const { projectId, dataFrameId } = action.meta.arg;
      state[projectId].dataFrames[dataFrameId].state = DataFrameLoadingState.ERROR;
    }),
);
