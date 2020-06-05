import { ID } from './state';
import { createAction, createReducer } from '@reduxjs/toolkit';

export interface Current {
  projectId: ID | null;
  isDraggingDroppedColumn: boolean;
}

export const initialCurrent: Current = {
  projectId: null,
  isDraggingDroppedColumn: false,
};

export const setCurrentProject = createAction<number>('setCurrentProject');
export const setIsDraggingDroppedColumn = createAction<boolean>('setIsDraggingDroppedColumn');

export const currentReducer = createReducer(initialCurrent, builder =>
  builder
    .addCase(setCurrentProject, (state, action) => {
      state.projectId = action.payload;
    })
    .addCase(setIsDraggingDroppedColumn, (state, action) => {
      state.isDraggingDroppedColumn = action.payload;
    }),
);
