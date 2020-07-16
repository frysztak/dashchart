import { Box, Flex } from 'reflexbox';
import { DataFrameSidebar } from '../../../../components/dataframe/DataFrameSidebar';
import React, { useEffect, useState } from 'react';
import {
  useChartCreator,
  useDataFrames,
  useDataFramesState,
  useIsDraggingDroppedColumn,
} from '../../../../store/selectors';
import { saveChart, SaveChartPayload } from '../../../../store/project';
import { useCurrentChart, useCurrentProject } from '../../../../store/hooks';
import { ChartCreator } from '../../../../components/chartcreator/ChartCreator';
import { LeftBoxShadow, RightBoxShadow } from '../../../../components/misc/BoxShadow';
import { ChartCreatorState, createChart } from '../../../../store/chartCreator';
import { ChartPropsSidebar } from '../../../../components/chartcreator/ChartPropsSidebar';
import { Icon } from '../../../../components/misc/Icon';
import { Chart, ErrorCircle, Layout, Save, Trash } from '@styled-icons/boxicons-regular';
import { IconWrapper } from '../../../../components/misc/IconWrapper';
import { styled } from '../../../../config/Theme';
import { AggregateChart } from '../../../../components/charts/AggregateChart';
import { DataFrame } from 'shared/DataFrame';
import { ChartProps, UserEditableChartProps } from '../../../../components/charts/common/Props';
import { synchroniseAndApplyUserProps } from '../../../../components/charts/AggregateChartMapper';
import { fold } from 'fp-ts/es6/Either';
import produce from 'immer';
import { ChartErrorBoundary } from '../../../../components/charts/ChartErrorBoundary';
import { ErrorMessage } from '../../../../components/misc/ErrorMessage';
import { DropZoneDumpster } from '../../../../components/chartcreator/DropZone';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { routes } from '../../../../config/routes';
import { Spinner } from '../../../../components/misc/Spinner';
import { ThreeBounce } from 'styled-spinkit';
import { IOStatus } from '../../../../store/common';

const ChartIcon = Icon(Chart);
const LayoutIcon = Icon(Layout);
const TrashIcon = Icon(Trash);
const SaveIcon = Icon(Save);
const ErrorIcon = Icon(ErrorCircle);

const Toolbar = styled.div`
  position: absolute;
  bottom: ${p => p.theme.dropZone.bgMargin};
  right: ${p => p.theme.dropZone.bgMargin};
  display: flex;

  & > * {
    margin-left: 16px;
  }
`;
const ModeIndicator = styled.div`
  cursor: pointer;
`;

const RelativeBox = styled(Box)`
  position: relative;
`;

function ChartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [project, projectState] = useCurrentProject();
  const dataFramesState = useDataFramesState(project);
  const dataFrames: DataFrame[] = useDataFrames(project);
  const [chart, isNewChart] = useCurrentChart(dataFrames);
  const chartCreator: ChartCreatorState | null = useChartCreator();
  const [layoutMode, setLayoutMode] = useState(true);
  const toggleLayoutMode = () => setLayoutMode(!layoutMode);
  const isDraggingDroppedColumn: boolean = useIsDraggingDroppedColumn();
  const [userProps, setUserProps] = useState(chart?.userProps || []);
  const [chartName, setChartName] = useState(chart?.name || 'New chart');
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
  const onUpdateChartProps = (newProps: UserEditableChartProps, idx: number) => {
    setUserProps(userProps =>
      produce(userProps, draft => {
        draft[idx] = newProps;
      }),
    );
  };
  const onUpdateChartName = (newName: string) => {
    setChartName(newName);
  };

  useEffect(() => setErrorBoundaryKey(errorBoundaryKey + 1), [userProps]);

  useEffect(() => {
    if (project && chartCreator?.savedId !== null) {
      const route = routes.chart(project.id, chartCreator.savedId);
      router.push(route.href, route.as);
    }
  }, [chartCreator]);

  useEffect(() => {
    if (chart) {
      setUserProps(chart.userProps);
      setChartName(chart.name);
    }
  }, [chart]);

  if (
    projectState === IOStatus.LOADING ||
    dataFramesState?.state === IOStatus.LOADING ||
    project?.charts.state === IOStatus.LOADING
  ) {
    return <Spinner />;
  }

  if (!project || !chartCreator) {
    return <ErrorMessage message={'Project not found.'} />;
  }
  if (!isNewChart && !chart) {
    return <ErrorMessage message={'Chart not found.'} />;
  }

  const onSaveChart = () => {
    if (chart && project.charts.data[chart.id].state === IOStatus.LOADING) {
      return;
    }

    const chartId: number = chart?.id || Object.values(project.charts).length + 1;
    const columns = chartCreator.currentColumns;
    const payload: SaveChartPayload = {
      projectId: project.id,
      chart: {
        id: chartId,
        name: chartName,
        columns: columns,
        userProps: userProps,
      },
    };
    if (isNewChart && project) {
      dispatch(createChart(payload));
    } else {
      dispatch(saveChart(payload));
    }
  };

  const synchronisedProps = synchroniseAndApplyUserProps(dataFrames, chartCreator.currentColumns, userProps);
  const chartElement = fold(
    (e: Error) => <ErrorMessage message={e.message} />,
    ([newUserProps, chartProps]: [UserEditableChartProps[], ChartProps[]]) => {
      if (newUserProps !== userProps) setUserProps(newUserProps);
      return (
        <ChartErrorBoundary key={errorBoundaryKey}>
          <AggregateChart chartProps={chartProps} />
        </ChartErrorBoundary>
      );
    },
  )(synchronisedProps);

  const ModeIcon = isDraggingDroppedColumn ? (
    <DropZoneDumpster>
      <TrashIcon size={32} />
    </DropZoneDumpster>
  ) : layoutMode ? (
    <LayoutIcon size={32} />
  ) : (
    <ChartIcon size={32} />
  );

  const saveIcon = () => {
    if (chart) {
      if (project.charts.data[chart.id].state === IOStatus.LOADING) {
        return <ThreeBounce size={32} color={'black'} />;
      } else if (project.charts.data[chart.id].state === IOStatus.ERROR) {
        return <ErrorIcon size={32} color={'red'} />;
      }
    }

    return <SaveIcon size={32} />;
  };

  return (
    <>
      <Head>
        <title>
          {project.name} :: {chart?.name || 'new chart'}
        </title>
      </Head>
      <Flex height={'100%'}>
        <Box>
          <RightBoxShadow>
            <DataFrameSidebar dataFrames={dataFrames} />
          </RightBoxShadow>
        </Box>
        <RelativeBox flexGrow={1}>
          {layoutMode ? <ChartCreator {...chartCreator} /> : { ...chartElement }}

          <Toolbar>
            <ModeIndicator onClick={toggleLayoutMode}>
              <IconWrapper size={42}>{ModeIcon}</IconWrapper>
            </ModeIndicator>

            <ModeIndicator onClick={onSaveChart}>
              <IconWrapper size={42}>{saveIcon()}</IconWrapper>
            </ModeIndicator>
          </Toolbar>
        </RelativeBox>
        <Box>
          <LeftBoxShadow>
            <ChartPropsSidebar
              chartName={chartName}
              updateName={onUpdateChartName}
              chartProps={userProps}
              updateProps={onUpdateChartProps}
            />
          </LeftBoxShadow>
        </Box>
      </Flex>
    </>
  );
}

export default ChartPage;
