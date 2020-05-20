import { Sidebar } from '../misc/Sidebar';
import { Box, Flex } from 'reflexbox';
import { LightText } from '../misc/LightText';
import React from 'react';
import { Checkbox } from '@rebass/forms';

export interface PropsSidebarProps {}

export function ChartPropsSidebar(props: PropsSidebarProps) {
  return (
    <Sidebar bgColor={'palePink'}>
      <Flex flexDirection={'column'} pt={2}>
        <Flex justifyContent={'center'} mb={4}>
          <LightText fontSize={4}>Chart Props</LightText>
        </Flex>

        <Box mx={2}>
          Layout mode
          <Checkbox checked={true} />
        </Box>
      </Flex>
    </Sidebar>
  );
}
