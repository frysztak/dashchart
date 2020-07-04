import { DataFrame } from 'shared/DataFrame';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { ID } from './state';
import { ColumnType } from '../../shared/DataFrame';
import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { ColumnId } from 'shared/DataFrame/index';
import { UserEditableChartProps } from '../components/charts/common/Props';

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
  errorMessage?: string;
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

export const projectReducer = createReducer(initialProjects, builder =>
  builder
    .addCase(saveChart, (state, action) => {
      const { projectId, chart } = action.payload;
      state[projectId].charts[chart.id] = chart;
    })
    .addCase(saveDataFrame, (state, action) => {
      const { projectId, container } = action.payload;
      state[projectId].dataFrames[container.id] = container;
    }),
);
