import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { ColumnId } from 'shared/DataFrame/index';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ColumnToDelete, DroppedColumn } from '../components/chartcreator/DropZone';
import { http } from './http';
import { Chart as PrismaChart } from '@prisma/client';
import { fetchCharts, SaveChartPayload } from './project';
import { ID } from './state';
import { IOStatus } from './common';

export interface ChartCreatorState {
  currentColumns: DropZoneValues<ColumnId>;
  savedId: ID | null;
  state: IOStatus;
  errorMessage?: string;
}

export const initialChartCreator: ChartCreatorState = {
  currentColumns: {},
  savedId: null,
  state: IOStatus.OK,
};

export const dropColumn = createAction<DroppedColumn>('dropColumn');
export const deleteColumn = createAction<ColumnToDelete>('deleteColumn');
export const resetCurrentColumns = createAction('resetCurrentColumns');
export const setCurrentColumns = createAction<DropZoneValues<ColumnId>>('setCurrentColumns');
export const clearSavedId = createAction('clearSavedId');

export const createChart = createAsyncThunk('chart/create', async (payload: SaveChartPayload, thunkAPI) => {
  const { projectId, chart } = payload;
  const response = await http
    .url(`/project/${projectId}/charts`)
    .post({
      name: chart.name,
      columns: chart.columns,
      props: chart.userProps,
    })
    .json<PrismaChart>();

  thunkAPI.dispatch(fetchCharts(projectId));
  return response;
});

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
    })
    .addCase(createChart.pending, (state, action) => {
      state.state = IOStatus.LOADING;
    })
    .addCase(createChart.fulfilled, (state, action) => {
      const chart = action.payload;
      state.state = IOStatus.OK;
      state.savedId = chart.id;
    })
    .addCase(createChart.rejected, (state, action) => {
      state.state = IOStatus.ERROR;
      state.errorMessage = action.error.message;
    })
    .addCase(clearSavedId, (state, action) => {
      state.savedId = null;
    }),
);
