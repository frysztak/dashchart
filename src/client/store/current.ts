import { ID } from './state';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { DataFrameContainer, DataFrameLoadingState } from './project';
import { CSVLoader } from 'shared/loaders/CSV';
import { Result, takeRight } from 'shared/utils/index';
import { DataFrame } from 'shared/DataFrame/index';
import { isLeft } from 'fp-ts/es6/Either';

export interface Current {
  projectId: ID | null;
  isDraggingDroppedColumn: boolean;
  editedDataFrame: DataFrameContainer | null;
}

export const initialCurrent: Current = {
  projectId: null,
  isDraggingDroppedColumn: false,
  editedDataFrame: null,
};

export const setCurrentProject = createAction<number>('setCurrentProject');
export const setIsDraggingDroppedColumn = createAction<boolean>('setIsDraggingDroppedColumn');

export interface DownloadDataFramePayload {
  projectId: ID;
  dataFrameId: ID;
  source: string;
}

export const setEditedDataFrame = createAction<DataFrameContainer>('dataFrame/setEdited');
export const resetEditedDataFrame = createAction('dataFrame/resetEdited');
export const downloadDataFrame = createAsyncThunk(
  'dataFrame/download',
  async (payload: DownloadDataFramePayload, thunkAPI) => {
    const loader = new CSVLoader();
    const result: Result<DataFrame> = await loader.loadUrl(payload.source)();
    if (isLeft(result)) {
      return thunkAPI.rejectWithValue(result.left);
    }

    return takeRight(result);
  },
);

export const currentReducer = createReducer(initialCurrent, builder =>
  builder
    .addCase(setCurrentProject, (state, action) => {
      state.projectId = action.payload;
    })
    .addCase(setIsDraggingDroppedColumn, (state, action) => {
      state.isDraggingDroppedColumn = action.payload;
    })
    .addCase(setEditedDataFrame, (state, action) => {
      const dataFrameContainer: DataFrameContainer = action.payload;
      state.editedDataFrame = dataFrameContainer;
    })
    .addCase(resetEditedDataFrame, (state, action) => {
      state.editedDataFrame = null;
    })
    .addCase(downloadDataFrame.pending, (state, action) => {
      if (state.editedDataFrame) {
        state.editedDataFrame.state = DataFrameLoadingState.LOADING;
      }
    })
    .addCase(downloadDataFrame.fulfilled, (state, action) => {
      const dataFrame: DataFrame = action.payload;
      const { dataFrameId, source } = action.meta.arg;
      if (state.editedDataFrame) {
        state.editedDataFrame = {
          id: dataFrameId,
          state: DataFrameLoadingState.IDLE,
          source: source,
          dataFrame: dataFrame,
        };
      }
    })
    .addCase(downloadDataFrame.rejected, (state, action) => {
      if (state.editedDataFrame) {
        state.editedDataFrame.state = DataFrameLoadingState.ERROR;
      }
    }),
);
