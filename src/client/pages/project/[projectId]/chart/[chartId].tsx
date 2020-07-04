import { Flex, Box } from 'reflexbox';
import { DataFrameSidebar } from '../../../../components/dataframe/DataFrameSidebar';
import React, { useEffect, useState } from 'react';
import { useChartCreator, useDataFrames, useIsDraggingDroppedColumn } from '../../../../store/selectors';
import { Project, saveChart, ChartState } from '../../../../store/project';
import { useCurrentChart, useCurrentProject } from '../../../../store/hooks';
import { ChartCreator } from '../../../../components/chartcreator/ChartCreator';
import { LeftBoxShadow, RightBoxShadow } from '../../../../components/misc/BoxShadow';
import { ChartCreatorState } from '../../../../store/chartCreator';
import { ChartPropsSidebar } from '../../../../components/chartcreator/ChartPropsSidebar';
import { Icon } from '../../../../components/misc/Icon';
import { Chart, Layout, Trash, Save } from '@styled-icons/boxicons-regular';
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

const ChartIcon = Icon(Chart);
const LayoutIcon = Icon(Layout);
const TrashIcon = Icon(Trash);
const SaveIcon = Icon(Save);

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
  const project: Project | null = useCurrentProject();
  const dataFrames: DataFrame[] = useDataFrames(project);
  const [chart, isNewChart] = useCurrentChart(dataFrames);
  const chartCreator: ChartCreatorState | null = useChartCreator();
  const [layoutMode, setLayoutMode] = useState(true);
  const toggleLayoutMode = () => setLayoutMode(!layoutMode);
  const isDraggingDroppedColumn: boolean = useIsDraggingDroppedColumn();
  const [userProps, setUserProps] = useState(chart?.userProps || []);
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
  const onUpdateChartProps = (newProps: UserEditableChartProps, idx: number) => {
    setUserProps(userProps =>
      produce(userProps, draft => {
        draft[idx] = newProps;
      }),
    );
  };

  useEffect(() => setErrorBoundaryKey(errorBoundaryKey + 1), [userProps]);

  if (!project || !chartCreator) {
    return <ErrorMessage message={'Project not found.'} />;
  }
  if (!isNewChart && !chart) {
    return <ErrorMessage message={'Chart not found.'} />;
  }

  const onSaveChart = () => {
    const chartId: number = chart?.id || Object.values(project.charts).length + 1;
    const chartName = chart?.name || `Chart ${chartId}`;
    const columns = chartCreator.currentColumns;
    dispatch(
      saveChart({
        projectId: project.id,
        chart: {
          id: chartId,
          name: chartName,
          columns: columns,
          userProps: userProps,
        },
      }),
    );
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
              <IconWrapper size={42}>
                <SaveIcon size={32} />
              </IconWrapper>
            </ModeIndicator>
          </Toolbar>
        </RelativeBox>
        <Box>
          <LeftBoxShadow>
            <ChartPropsSidebar chartProps={userProps} updateProps={onUpdateChartProps} />
          </LeftBoxShadow>
        </Box>
      </Flex>
    </>
  );
}

export default ChartPage;
