import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { ColumnId } from 'shared/DataFrame/index';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { DroppedColumn, ColumnToDelete } from '../components/chartcreator/DropZone';

export interface ChartCreatorState {
  currentColumns: DropZoneValues<ColumnId>;
}

export const initialChartCreator: ChartCreatorState = {
  currentColumns: {},
};

export const dropColumn = createAction<DroppedColumn>('dropColumn');
export const deleteColumn = createAction<ColumnToDelete>('deleteColumn');
export const resetCurrentColumns = createAction('resetCurrentColumns');
export const setCurrentColumns = createAction<DropZoneValues<ColumnId>>('setCurrentColumns');

export const chartCreatorReducer = createReducer(initialChartCreator, builder =>
  builder
    .addCase(dropColumn, (state, action) => {
      const { fromLocation, toLocation, columnName, dataFrameId, dataFrameName } = action.payload;

      if (fromLocation) {
        delete state.currentColumns[fromLocation];
      }

      state.currentColumns[toLocation] = {
        columnName,
        dataFrameId: dataFrameId,
        dataFrameName: dataFrameName,
      };
    })
    .addCase(deleteColumn, (state, action) => {
      const { fromLocation, columnName, dataFrameId } = action.payload;
      delete state.currentColumns[fromLocation];
    })
    .addCase(resetCurrentColumns, (state, action) => {
      state.currentColumns = {};
    })
    .addCase(setCurrentColumns, (state, action) => {
      state.currentColumns = action.payload;
    }),
);
