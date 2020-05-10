import { DataFrame } from 'shared/DataFrame';
import { styled } from '../../config/Theme';
import { DataFrameColumnList } from './DataFrameColumnList';
import React from 'react';
import { LightText } from '../LightText';
import { Flex, Box } from 'reflexbox';

export interface DataFrameSidebarProps {
  dataFrames: DataFrame[];
}

const Background = styled.div`
  background-color: ${p => p.theme.colors.palePink};
  width: 250px;
  height: 100%;
  overflow-y: auto;
`;

export function DataFrameSidebar(props: DataFrameSidebarProps) {
  return (
    <Background>
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
    </Background>
  );
}
