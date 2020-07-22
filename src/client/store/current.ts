import { ID } from './state';
import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { DataFrameContainer } from './project';
import { CSVLoader } from 'shared/loaders/CSV';
import { Result, takeRight } from 'shared/utils/index';
import { ColumnType, convertColumn, DataFrame } from 'shared/DataFrame/index';
import { isLeft, isRight } from 'fp-ts/es6/Either';
import { IOStatus } from './common';

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
      return thunkAPI.rejectWithValue(result.left.message);
    }

    return takeRight(result);
  },
);

export interface ConvertColumnTypePayload {
  columnName: string;
  columnType: ColumnType;
}

export const convertColumnType = createAction<ConvertColumnTypePayload>('dataFrame/convertColumnType');

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
        state.editedDataFrame.state = IOStatus.LOADING;
      }
    })
    .addCase(downloadDataFrame.fulfilled, (state, action) => {
      const dataFrame: DataFrame = action.payload;
      const { dataFrameId, source } = action.meta.arg;
      if (state.editedDataFrame) {
        state.editedDataFrame = {
          id: dataFrameId,
          state: IOStatus.OK,
          source: source,
          dataFrame: dataFrame,
        };
      }
    })
    .addCase(downloadDataFrame.rejected, (state, action) => {
      const message = action.payload as string;
      if (state.editedDataFrame) {
        state.editedDataFrame.state = IOStatus.ERROR;
        state.editedDataFrame.errorMessage = message;
      }
    })
    .addCase(convertColumnType, (state, action) => {
      const { columnName, columnType } = action.payload;
      if (state.editedDataFrame && columnName in state.editedDataFrame.dataFrame.columns) {
        const newDF = convertColumn(state.editedDataFrame.dataFrame, columnName, columnType);
        if (isRight(newDF)) {
          state.editedDataFrame.dataFrame = takeRight(newDF);
        } else {
          console.error(newDF.left);
        }
      }
    }),
);
