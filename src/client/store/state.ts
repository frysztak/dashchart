import { initialProjects, Project } from './project';
import { Current, initialCurrent } from './current';

export type ID = number;

export interface AppState {
  current: Current;
  projects: Record<ID, Project>;
}

export const initialState: AppState = {
  current: initialCurrent,
  projects: initialProjects,
};
