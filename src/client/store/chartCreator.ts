import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { ColumnId } from 'shared/DataFrame/index';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { DroppedColumn } from '../components/chartcreator/DropZone';

export interface ChartCreatorState {
  currentColumns: DropZoneValues<ColumnId>;
}

export const initialChartCreator: ChartCreatorState = {
  currentColumns: {},
};

export const dropColumn = createAction<DroppedColumn>('dropColumn');

export const chartCreatorReducer = createReducer(initialChartCreator, builder =>
  builder.addCase(dropColumn, (state, action) => {
    const { fromLocation, toLocation, columnName, dataFrameName } = action.payload;

    if (fromLocation) {
      state.currentColumns[fromLocation] = undefined;
    }

    state.currentColumns[toLocation] = {
      columnName,
      dataFrameName,
    };
  }),
);
