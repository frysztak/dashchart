import { createRoute } from 'next-typed-routes';

export const routes = {
  home: createRoute('/'),
  projects: createRoute('/projects'),
  project: (projectId: number) => createRoute('/project/[projectId]', { projectId }),
  charts: (projectId: number) => createRoute('/project/[projectId]/charts', { projectId }),
  chart: (projectId: number, chartId: number) =>
    createRoute('/project/[projectId]/chart/[chartId]', { projectId, chartId }),
  newChart: (projectId: number) => createRoute('/project/[projectId]/chart/new', { projectId }),
};
