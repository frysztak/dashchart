import React from 'react';
import { MenuItem } from './MenuItems';
import { styled } from '../../config/Theme';
import { ChevronLeft } from '@styled-icons/feather/ChevronLeft';
import { Icon } from '../misc/Icon';
import { Flex, Box } from 'reflexbox';
import { Text } from 'rebass';
import { TabBar } from './TabBar';
import { Avatar } from './Avatar';
import { Bell, Cog } from '@styled-icons/boxicons-solid';

export interface MenuBarProps {
  projectName: string;
  currentMenuItem: MenuItem;
}

const Background = styled.div`
  height: 64px;
  width: 100%;
  background-color: ${p => p.theme.colors.lightGrey};
`;

const BackIcon = Icon(ChevronLeft);
const BellIcon = Icon(Bell);
const CogIcon = Icon(Cog);

export function MenuBar(props: MenuBarProps) {
  return (
    <Background>
      <Flex alignItems={'center'} justifyContent={'space-between'} height={'100%'}>
        <Flex justifyContent={'center'} alignItems={'center'}>
          <BackIcon size={42} color={'grey'} />
          <Text fontSize={3}>{props.projectName}</Text>
        </Flex>

        <Flex height={'100%'} alignItems={'center'}>
          <TabBar currentMenuItem={props.currentMenuItem} />
        </Flex>

        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text mr={3}>{'ANONYMOUS'}</Text>
          <Box mr={3}>
            <Avatar />
          </Box>
          <Box mr={3}>
            <BellIcon size={'32px'} color={'grey'} />
          </Box>
          <Box mr={3}>
            <CogIcon size={'32px'} color={'grey'} />
          </Box>
        </Flex>
      </Flex>
    </Background>
  );
}
