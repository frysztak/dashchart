import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { ColumnId } from 'shared/DataFrame/index';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ColumnToDelete, DroppedColumn } from '../components/chartcreator/DropZone';
import { http } from './http';
import { Chart as PrismaChart } from '@prisma/client';
import { LoadingState, SaveChartPayload } from './project';
import { ID } from './state';

export interface ChartCreatorState {
  currentColumns: DropZoneValues<ColumnId>;
  savedId: ID | null;
  state: LoadingState;
  errorMessage?: string;
}

export const initialChartCreator: ChartCreatorState = {
  currentColumns: {},
  savedId: null,
  state: LoadingState.IDLE,
};

export const dropColumn = createAction<DroppedColumn>('dropColumn');
export const deleteColumn = createAction<ColumnToDelete>('deleteColumn');
export const resetCurrentColumns = createAction('resetCurrentColumns');
export const setCurrentColumns = createAction<DropZoneValues<ColumnId>>('setCurrentColumns');

export const createChart = createAsyncThunk('chart/create', async (payload: SaveChartPayload) => {
  const { projectId, chart } = payload;
  return await http
    .url(`/project/${projectId}/charts`)
    .post({
      name: chart.name,
      columns: chart.columns,
      props: chart.userProps,
    })
    .json<PrismaChart>();
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
      state.state = LoadingState.LOADING;
    })
    .addCase(createChart.fulfilled, (state, action) => {
      const chart = action.payload;
      state.state = LoadingState.IDLE;
      state.savedId = chart.id;
    })
    .addCase(createChart.rejected, (state, action) => {
      state.state = LoadingState.ERROR;
      state.errorMessage = action.error.message;
    }),
);
