import { initialProjects, Project } from './project';
import { Current, initialCurrent } from './current';
import { ChartCreatorState, initialChartCreator } from './chartCreator';

export type ID = number;

export interface AppState {
  current: Current;
  projects: Record<ID, Project>;
  chartCreator: ChartCreatorState;
}

export const initialState: AppState = {
  current: initialCurrent,
  projects: initialProjects,
  chartCreator: initialChartCreator,
};
