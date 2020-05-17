import { Flex, Box } from 'reflexbox';
import { DataFrameSidebar } from '../../../../components/dataframe/DataFrameSidebar';
import React from 'react';
import { useChartCreator, useDataFrames } from '../../../../store/selectors';
import { Project, DataFrameState, ChartCreatorState } from '../../../../store/project';
import { useCurrentProject } from '../../../../store/hooks';
import { ChartCreator } from '../../../../components/chartcreator/ChartCreator';
import { RightBoxShadow } from '../../../../components/misc/BoxShadow';

function New() {
  const project: Project | null = useCurrentProject();
  const dataFrames: DataFrameState[] = useDataFrames(project) ?? [];
  const chartCreator: ChartCreatorState | null = useChartCreator(project);
  if (!project || !chartCreator) {
    return <>Project not found.</>;
  }

  return (
    <Flex height={'100%'}>
      <Box>
        <RightBoxShadow>
          <DataFrameSidebar dataFrames={dataFrames.map(df => df.dataFrame)} />
        </RightBoxShadow>
      </Box>
      <Box flexGrow={1}>
        <ChartCreator {...chartCreator} />
      </Box>
    </Flex>
  );
}

export default New;
