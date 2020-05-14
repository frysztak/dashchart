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
  onBackClicked: () => void;
  onItemClicked: (item: MenuItem) => void;
  onUserClicked: () => void;
  onNotificationsClicked: () => void;
  onSettingsClicked: () => void;
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
          <BackIcon size={42} color={'grey'} onClick={props.onBackClicked} />
          <Text fontSize={3}>{props.projectName}</Text>
        </Flex>

        <Flex height={'100%'} alignItems={'center'}>
          <TabBar currentMenuItem={props.currentMenuItem} onItemClicked={props.onItemClicked} />
        </Flex>

        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text mr={3}>{'ANONYMOUS'}</Text>
          <Box mr={3}>
            <Avatar size={'32px'} onClick={props.onUserClicked} />
          </Box>
          <Box mr={3}>
            <BellIcon size={'32px'} color={'grey'} onClick={props.onNotificationsClicked} />
          </Box>
          <Box mr={3}>
            <CogIcon size={'32px'} color={'grey'} onClick={props.onSettingsClicked} />
          </Box>
        </Flex>
      </Flex>
    </Background>
  );
}
