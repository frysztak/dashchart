import { DataFrame } from 'shared/DataFrame';
import { DataFrameColumnList } from './DataFrameColumnList';
import React from 'react';
import { LightText } from '../LightText';
import { Flex, Box } from 'reflexbox';
import { Sidebar } from '../Sidebar';

export interface DataFrameSidebarProps {
  dataFrames: DataFrame[];
}

export function DataFrameSidebar(props: DataFrameSidebarProps) {
  return (
    <Sidebar bgColor={'palePink'}>
      <Flex flexDirection={'column'} pt={2}>
        <Flex justifyContent={'center'} mb={4}>
          <LightText fontSize={4}>Data Frames</LightText>
        </Flex>

        <Box mx={2}>
          {props.dataFrames.map((dataFrame: DataFrame, idx: number) => (
            <Box mb={4}>
              <DataFrameColumnList dataFrame={dataFrame} key={idx} />
            </Box>
          ))}
        </Box>
      </Flex>
    </Sidebar>
  );
}
