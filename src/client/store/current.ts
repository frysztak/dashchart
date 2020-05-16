import { ID } from './state';
import { createAction, createReducer } from '@reduxjs/toolkit';

export interface Current {
  projectId: ID | null;
}

export const initialCurrent: Current = {
  projectId: null,
};

export const setCurrentProject = createAction<number>('setCurrentProject');

export const currentReducer = createReducer(initialCurrent, builder =>
  builder.addCase(setCurrentProject, (state, action) => {
    state.projectId = action.payload;
  }),
);
