import { DataFrame } from 'shared/DataFrame';
import { AggregateChartProps } from '../components/charts/AggregateChart';
import { createReducer } from '@reduxjs/toolkit';
import { ID } from './state';
import { ColumnType } from '../../shared/DataFrame';
import { enableMapSet } from 'immer';

export type Projects = Record<ID, Project>;

export interface Project {
  name: string;
  id: number;
  dataFrames: Record<ID, DataFrameState>;
  charts: Record<ID, ChartState>;
  dashboards: Record<ID, DashboardState>;
}

export interface DataFrameState {
  id: number;
  source: string;
  dataFrame: DataFrame;
}

export interface ChartState {
  id: number;
  name: string;
  props: AggregateChartProps;
}

export interface DashboardState {}

enableMapSet();
export const initialProjects: Projects = {
  1: {
    name: 'My Project',
    id: 1,
    dataFrames: {
      1: {
        id: 1,
        source: '',
        dataFrame: new DataFrame('My DF', {
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
        }),
      },
    },
    charts: {},
    dashboards: {},
  },
};

export const projectReducer = createReducer(initialProjects, builder => builder);
