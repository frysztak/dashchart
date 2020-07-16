import { useRouter } from 'next/router';
import { AppState, ID } from './state';
import { isNumeric, keys } from 'shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentProject, setEditedDataFrame } from './current';
import { Project, ChartState, DataFrameContainer, fetchProjects, fetchDataFrames, fetchCharts } from './project';
import {
  useChartById,
  useCurrentProjectFromStore,
  useCurrentProjectId,
  useDataFrameById,
  useDataFrameContainers,
  useEditedDataFrame,
  useProjects,
} from './selectors';
import { resetCurrentColumns, setCurrentColumns } from './chartCreator';
import { DropZoneValues } from '../components/chartcreator/DragNDrop';
import { ColumnId, DataFrame } from 'shared/DataFrame';
import { IOStatus } from './common';

export function useCurrentProject(): [Project | null, IOStatus] {
  const router = useRouter();
  const dispatch = useDispatch();

  const { projects, state } = useProjects();
  const isProjectIdValid: boolean = 'projectId' in router.query && isNumeric(router.query.projectId);
  const projectId: ID | null = isProjectIdValid ? +router.query.projectId! : null;
  const currentProjectId: number | null = useCurrentProjectId();

  useEffect(() => {
    if (projectId !== null && projectId !== currentProjectId) {
      dispatch(setCurrentProject(projectId));
    }
  });

  useEffect(() => {
    if (Object.keys(projects).length === 0) {
      dispatch(fetchProjects());
    }
  }, []);

  // prettier-ignore
  const project: Project | null =  useSelector((state: AppState) => (projectId === null
    ? null
    : projectId in state.projects.projects
      ? state.projects.projects[projectId]
      : null
  ));

  const [dispatchedFetch, setDispatchedFetch] = useState(false);
  useEffect(() => {
    if (projectId === null) return;
    const currentProject = projects[projectId];
    if (!dispatchedFetch && currentProject) {
      if (Object.keys(currentProject.dataFrames.data).length === 0) {
        dispatch(fetchDataFrames(currentProject.id));
      }
      if (Object.keys(currentProject.charts.data).length === 0) {
        dispatch(fetchCharts(currentProject.id));
      }
      setDispatchedFetch(true);
    }
  }, [projects]);

  return [project, state];
}

export function useCurrentChart(dataFrames: DataFrame[]): [ChartState | null, boolean] {
  const router = useRouter();
  const dispatch = useDispatch();

  const isNewChart: boolean = 'chartId' in router.query && router.query.chartId === 'new';
  const isChartIdValid: boolean = 'chartId' in router.query && isNumeric(router.query.chartId);
  const chartId: ID | null = isChartIdValid ? +router.query.chartId! : null;
  const chart: ChartState | null = useChartById(chartId);

  const [columnsDispatched, setColumnsDispatched] = useState(false);
  useEffect(() => {
    if (columnsDispatched) return;

    if (isNewChart) {
      dispatch(resetCurrentColumns());
      setColumnsDispatched(true);
    } else if (chartId !== null && chart) {
      const columnsWithNames: DropZoneValues<ColumnId> = keys(chart.columns).reduce((acc, location) => {
        const column = chart.columns[location]!;
        return {
          ...acc,
          [location]: {
            ...chart.columns[location]!,
            dataFrameName: dataFrames.find(df => df.id === column.dataFrameId)?.name || 'Unknown DF',
          },
        };
      }, {});
      dispatch(setCurrentColumns(columnsWithNames));
      setColumnsDispatched(true);
    }
  }, [chartId, chart, columnsDispatched, dispatch]);

  return [chart, isNewChart];
}

export function useNextDataFrameId(): ID {
  const project: Project | null = useCurrentProjectFromStore();
  const dataFrames: DataFrameContainer[] = useDataFrameContainers(project);
  const maxId: ID = Math.max(...dataFrames.map(df => df.id));
  const nextDataFrameId: ID = isFinite(maxId) ? maxId + 1 : 1;
  return nextDataFrameId;
}

export function useCurrentDataFrame(): [DataFrameContainer | null, boolean] {
  const router = useRouter();
  const dispatch = useDispatch();

  const isNewDataFrame: boolean = 'dataFrameId' in router.query && router.query.dataFrameId === 'new';
  const isChartIdValid: boolean = 'dataFrameId' in router.query && isNumeric(router.query.dataFrameId);
  const dataFrameId: ID | null = isChartIdValid ? +router.query.dataFrameId! : null;
  const [newDataFrameEmitted, setNewDataFrameEmitted] = useState(false);
  const editedDataFrame: DataFrameContainer | null = useEditedDataFrame();
  const dataFrameFromStore: DataFrameContainer | null = useDataFrameById(dataFrameId);
  const nextDataFrameId: ID = useNextDataFrameId();
  const container = editedDataFrame ?? dataFrameFromStore;

  useEffect(() => {
    if (isNewDataFrame && !newDataFrameEmitted) {
      dispatch(
        setEditedDataFrame({
          id: nextDataFrameId,
          source: '',
          state: IOStatus.OK,
          dataFrame: {
            id: nextDataFrameId,
            name: 'New Data Frame',
            columns: {},
          },
        }),
      );
      setNewDataFrameEmitted(true);
    }
  }, [isNewDataFrame, newDataFrameEmitted]);

  useEffect(() => {
    if (isNewDataFrame && container) {
      dispatch(
        setEditedDataFrame({
          ...container,
          id: nextDataFrameId,
        }),
      );
    }
  }, [nextDataFrameId, isNewDataFrame]);

  useEffect(() => {
    if (dataFrameId !== null && container && editedDataFrame === null) {
      dispatch(setEditedDataFrame(container));
    }
  }, [container]);

  return [container, isNewDataFrame];
}
