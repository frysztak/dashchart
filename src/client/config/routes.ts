import { createRoute } from 'next-typed-routes';
import { ID } from '../store/state';

export const routes = {
  home: createRoute('/'),

  projects: createRoute('/projects'),
  project: (projectId: ID) => createRoute('/project/[projectId]', { projectId }),

  charts: (projectId: ID) => createRoute('/project/[projectId]/charts', { projectId }),
  chart: (projectId: ID, chartId: ID) => createRoute('/project/[projectId]/chart/[chartId]', { projectId, chartId }),
  newChart: (projectId: ID) => createRoute('/project/[projectId]/chart/[chartId]', { projectId, chartId: 'new' }),

  dataFrames: (projectId: ID) => createRoute('/project/[projectId]/dataframes', { projectId }),
  dataFrame: (projectId: ID, dataFrameId: ID) =>
    createRoute('/project/[projectId]/dataframes/[dataFrameId]', { projectId, dataFrameId }),
  newDataFrame: (projectId: ID) =>
    createRoute('/project/[projectId]/dataframes/[dataFrameId]', { projectId, dataFrameId: 'new' }),
};
