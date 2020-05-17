import { Flex, Box } from 'reflexbox';
import { DataFrameSidebar } from '../../../../components/dataframe/DataFrameSidebar';
import React from 'react';
import { useDataFrames } from '../../../../store/selectors';
import { Project, DataFrameState } from '../../../../store/project';
import { useCurrentProject } from '../../../../store/hooks';

function New() {
  const project: Project | null = useCurrentProject();
  const dataFrames: DataFrameState[] = useDataFrames(project) ?? [];
  if (!project) {
    return <>Project not found.</>;
  }

  return (
    <Flex height={'100%'}>
      <Box>
        <DataFrameSidebar dataFrames={dataFrames.map(df => df.dataFrame)} />
      </Box>
    </Flex>
  );
}

export default New;
