import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './project';
import { initialState, AppState } from './state';
import { currentReducer } from './current';

const appReducer = combineReducers({
  projects: projectReducer,
  current: currentReducer,
});
export const store = configureStore<AppState>({
  reducer: appReducer,
  preloadedState: initialState,
});
