import { Flex, Box } from 'reflexbox';
import { DataFrameSidebar } from '../../../../components/dataframe/DataFrameSidebar';
import React, { useState } from 'react';
import { useChartCreator, useDataFrames } from '../../../../store/selectors';
import { Project } from '../../../../store/project';
import { useCurrentProject } from '../../../../store/hooks';
import { ChartCreator } from '../../../../components/chartcreator/ChartCreator';
import { LeftBoxShadow, RightBoxShadow } from '../../../../components/misc/BoxShadow';
import { ChartCreatorState } from '../../../../store/chartCreator';
import { ChartPropsSidebar } from '../../../../components/chartcreator/ChartPropsSidebar';
import { Icon } from '../../../../components/misc/Icon';
import { Chart, Layout } from '@styled-icons/boxicons-regular';
import { IconWrapper } from '../../../../components/misc/IconWrapper';
import { styled } from '../../../../config/Theme';
import { AggregateChart } from '../../../../components/charts/AggregateChart';
import { DataFrame } from 'shared/DataFrame';
import { Ok, Result } from 'shared/utils/index';
import { ChartProps, PositionalChartData, UserEditableChartProps } from '../../../../components/charts/common/Props';
import { applyUserProps, mapDroppedColumns } from '../../../../components/charts/AggregateChartMapper';
import { chain, fold } from 'fp-ts/es6/Either';
import produce from 'immer';
import { pipe } from 'fp-ts/es6/pipeable';
import { DefaultChartProps } from '../../../../components/charts/common/Defaults';

const ChartIcon = Icon(Chart);
const LayoutIcon = Icon(Layout);

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
  const [userProps, setUserProps] = useState([] as UserEditableChartProps[]);
  const onUpdateChartProps = (newProps: UserEditableChartProps, idx: number) => {
    setUserProps(
      produce(userProps, draft => {
        draft[idx] = newProps;
      }),
    );
  };
  const insertDefaultUserProps = (chartData: PositionalChartData[]): Result<boolean> => {
    const n: number = chartData.length - userProps.length;
    if (n > 0) {
      setUserProps([...userProps, ...Array(n).fill(DefaultChartProps)]);
    }
    return Ok(true);
  };

  if (!project || !chartCreator) {
    return <>Project not found.</>;
  }

  const chartDataR: Result<PositionalChartData[]> = mapDroppedColumns(dataFrames, chartCreator.currentColumns);
  pipe(chartDataR, chain(insertDefaultUserProps));
  const chartPropsR: Result<ChartProps[]> = applyUserProps(chartDataR, userProps);
  const chart = fold(
    (e: Error) => <div>{e.message}</div>,
    (chartProps: ChartProps[]) => <AggregateChart chartProps={chartProps} />,
  )(chartPropsR);

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
          <IconWrapper size={42}>{layoutMode ? <LayoutIcon size={32} /> : <ChartIcon size={32} />}</IconWrapper>
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
