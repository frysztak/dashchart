import { DataFrame } from 'shared/DataFrame';
import { AggregateChartProps } from '../components/charts/AggregateChart';
import { createReducer } from '@reduxjs/toolkit';
import { ID } from './state';

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

export const initialProjects: Projects = {
  1: {
    name: 'My Project',
    id: 1,
    dataFrames: {},
    charts: {},
    dashboards: {},
  },
};

export const projectReducer = createReducer(initialProjects, builder => builder);
