import { Flex, Box } from 'reflexbox';
import { DataFrameSidebar } from '../../../../components/dataframe/DataFrameSidebar';
import React, { useEffect, useState } from 'react';
import { useChartCreator, useDataFrames, useIsDraggingDroppedColumn } from '../../../../store/selectors';
import { Project } from '../../../../store/project';
import { useCurrentProject } from '../../../../store/hooks';
import { ChartCreator } from '../../../../components/chartcreator/ChartCreator';
import { LeftBoxShadow, RightBoxShadow } from '../../../../components/misc/BoxShadow';
import { ChartCreatorState } from '../../../../store/chartCreator';
import { ChartPropsSidebar } from '../../../../components/chartcreator/ChartPropsSidebar';
import { Icon } from '../../../../components/misc/Icon';
import { Chart, Layout, Trash } from '@styled-icons/boxicons-regular';
import { IconWrapper } from '../../../../components/misc/IconWrapper';
import { styled } from '../../../../config/Theme';
import { AggregateChart } from '../../../../components/charts/AggregateChart';
import { DataFrame } from 'shared/DataFrame';
import { Ok, Result } from 'shared/utils/index';
import { ChartProps, PositionalChartData, UserEditableChartProps } from '../../../../components/charts/common/Props';
import {
  applyUserProps,
  mapDroppedColumns,
  synchroniseUserProps,
} from '../../../../components/charts/AggregateChartMapper';
import { fold, map } from 'fp-ts/es6/Either';
import produce from 'immer';
import { ChartErrorBoundary } from '../../../../components/charts/ChartErrorBoundary';
import { ErrorMessage } from '../../../../components/misc/ErrorMessage';
import { DropZoneDumpster } from '../../../../components/chartcreator/DropZone';

const ChartIcon = Icon(Chart);
const LayoutIcon = Icon(Layout);
const TrashIcon = Icon(Trash);

const ModeIndicator = styled.div`
  position: absolute;
  bottom: ${p => p.theme.dropZone.bgMargin};
  right: ${p => p.theme.dropZone.bgMargin};
  cursor: pointer;
`;

const RelativeBox = styled(Box)`
  position: relative;
`;

function New() {
  const project: Project | null = useCurrentProject();
  const dataFrames: DataFrame[] = useDataFrames(project);
  const chartCreator: ChartCreatorState | null = useChartCreator();
  const [layoutMode, setLayoutMode] = useState(true);
  const toggleLayoutMode = () => setLayoutMode(!layoutMode);
  const isDraggingDroppedColumn: boolean = useIsDraggingDroppedColumn();
  const [userProps, setUserProps] = useState([] as UserEditableChartProps[]);
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
    return <>Project not found.</>;
  }

  const chartDataR: Result<PositionalChartData[]> = mapDroppedColumns(dataFrames, chartCreator.currentColumns);
  fold(
    () => {},
    (newUserProps: UserEditableChartProps[]) => (newUserProps !== userProps ? setUserProps(newUserProps) : {}),
  )(map(synchroniseUserProps(userProps))(chartDataR));
  const chartPropsR: Result<ChartProps[]> = applyUserProps(chartDataR, userProps);
  const chart = fold(
    (e: Error) => <ErrorMessage message={e.message} />,
    (chartProps: ChartProps[]) => (
      <ChartErrorBoundary key={errorBoundaryKey}>
        <AggregateChart chartProps={chartProps} />
      </ChartErrorBoundary>
    ),
  )(chartPropsR);

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
    <Flex height={'100%'}>
      <Box>
        <RightBoxShadow>
          <DataFrameSidebar dataFrames={dataFrames} />
        </RightBoxShadow>
      </Box>
      <RelativeBox flexGrow={1}>
        {layoutMode ? <ChartCreator {...chartCreator} /> : { ...chart }}

        <ModeIndicator onClick={toggleLayoutMode}>
          <IconWrapper size={42}>{ModeIcon}</IconWrapper>
        </ModeIndicator>
      </RelativeBox>
      <Box>
        <LeftBoxShadow>
          <ChartPropsSidebar chartProps={userProps} updateProps={onUpdateChartProps} />
        </LeftBoxShadow>
      </Box>
    </Flex>
  );
}

export default New;
