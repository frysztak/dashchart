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

const ChartIcon = Icon(Chart);
const LayoutIcon = Icon(Layout);

const ModeIndicator = styled.div`
  position: absolute;
  bottom: ${p => p.theme.dropZone.bgMargin};
  right: ${p => p.theme.dropZone.bgMargin};
  cursor: pointer;
`;

function New() {
  const project: Project | null = useCurrentProject();
  const dataFrames: DataFrame[] = useDataFrames(project);
  const chartCreator: ChartCreatorState | null = useChartCreator();
  const [layoutMode, setLayoutMode] = useState(true);
  const toggleLayoutMode = () => setLayoutMode(!layoutMode);

  if (!project || !chartCreator) {
    return <>Project not found.</>;
  }

  return (
    <Flex height={'100%'}>
      <Box>
        <RightBoxShadow>
          <DataFrameSidebar dataFrames={dataFrames} />
        </RightBoxShadow>
      </Box>
      <Box flexGrow={1} css={{ position: 'relative' }}>
        {layoutMode ? (
          <ChartCreator {...chartCreator} />
        ) : (
          <AggregateChart dataFrames={dataFrames} droppedColumns={chartCreator.currentColumns} />
        )}

        <ModeIndicator onClick={toggleLayoutMode}>
          <IconWrapper size={42}>{layoutMode ? <LayoutIcon size={32} /> : <ChartIcon size={32} />}</IconWrapper>
        </ModeIndicator>
      </Box>
      <Box>
        <LeftBoxShadow>
          <ChartPropsSidebar />
        </LeftBoxShadow>
      </Box>
    </Flex>
  );
}

export default New;
