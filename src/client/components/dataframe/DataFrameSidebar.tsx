import { DataFrame } from 'shared/DataFrame';
import { DataFrameColumnList } from './DataFrameColumnList';
import React from 'react';
import { LightText } from '../misc/LightText';
import { Flex, Box } from 'reflexbox';
import { Sidebar } from '../misc/Sidebar';

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
          {props.dataFrames.length === 0 ? (
            <LightText fontSize={3} textAlign={'center'}>
              No Data Frames were found. Add some?
            </LightText>
          ) : (
            props.dataFrames.map((dataFrame: DataFrame, idx: number) => (
              <Box mb={4}>
                <DataFrameColumnList dataFrame={dataFrame} key={idx} />
              </Box>
            ))
          )}
        </Box>
      </Flex>
    </Sidebar>
  );
}
