import { initialProjectsState, ProjectsState } from './project';
import { Current, initialCurrent } from './current';
import { ChartCreatorState, initialChartCreator } from './chartCreator';

export type ID = number;

export interface AppState {
  current: Current;
  projects: ProjectsState;
  chartCreator: ChartCreatorState;
}

export const initialState: AppState = {
  current: initialCurrent,
  projects: initialProjectsState,
  chartCreator: initialChartCreator,
};
