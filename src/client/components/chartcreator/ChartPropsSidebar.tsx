import { Sidebar } from '../misc/Sidebar';
import { Box, Flex } from 'reflexbox';
import { LightText } from '../misc/LightText';
import React from 'react';
import { UserEditableChartProps } from '../charts/common/Props';
import { PropsEditor } from './PropsEditor/PropsEditor';

export interface PropsSidebarProps {
  chartProps: UserEditableChartProps[];
  updateProps: (newProps: UserEditableChartProps, idx: number) => void;
}

export function ChartPropsSidebar(props: PropsSidebarProps) {
  const onUpdateProps = (idx: number) => (newProps: UserEditableChartProps) => props.updateProps(newProps, idx);

  return (
    <Sidebar bgColor={'palePink'}>
      <Flex flexDirection={'column'} pt={2}>
        <Flex justifyContent={'center'} mb={4}>
          <LightText fontSize={4}>Chart Props</LightText>
        </Flex>

        <Box mx={2}>
          {props.chartProps.map((chartProps: UserEditableChartProps, idx: number) => (
            <PropsEditor
              key={idx}
              chartName={`Chart #${idx + 1}`}
              chartProps={chartProps}
              updateProps={onUpdateProps(idx)}
            />
          ))}
        </Box>
      </Flex>
    </Sidebar>
  );
}
