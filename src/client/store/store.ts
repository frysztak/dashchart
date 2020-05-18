import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './project';
import { initialState, AppState } from './state';
import { currentReducer } from './current';
import { chartCreatorReducer } from './chartCreator';

const appReducer = combineReducers({
  projects: projectReducer,
  current: currentReducer,
  chartCreator: chartCreatorReducer,
});
export const store = configureStore<AppState>({
  reducer: appReducer,
  preloadedState: initialState,
});
