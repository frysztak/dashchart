import React from 'react';
import { MenuItem } from './MenuItems';
import { styled } from '../../config/Theme';
import { ChevronLeft } from '@styled-icons/feather/ChevronLeft';
import { Icon } from '../misc/Icon';
import { Flex, Box } from 'reflexbox';
import { TabBar } from './TabBar';
import { Avatar } from './Avatar';
import { Bell, Cog } from '@styled-icons/boxicons-solid';
import { Pulsate, Rotate, Wobble } from '../misc/animations';
import { TruncatedText } from '../misc/LightText';

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
        <Flex justifyContent={'flex-start'} alignItems={'center'} flexBasis={'300px'}>
          <Pulsate>
            <BackIcon size={42} color={'grey'} onClick={props.onBackClicked} />
          </Pulsate>
          <TruncatedText fontSize={3}>{props.projectName}</TruncatedText>
        </Flex>

        <Flex height={'100%'} alignItems={'center'}>
          <TabBar currentMenuItem={props.currentMenuItem} onItemClicked={props.onItemClicked} />
        </Flex>

        <Flex alignItems={'center'} justifyContent={'flex-end'} flexBasis={'300px'}>
          <TruncatedText mr={3}>{'ANONYMOUS'}</TruncatedText>
          <Box mr={3} flexShrink={0}>
            <Avatar size={'32px'} onClick={props.onUserClicked} />
          </Box>
          <Box mr={3} flexShrink={0}>
            <Wobble>
              <BellIcon size={'32px'} color={'grey'} onClick={props.onNotificationsClicked} />
            </Wobble>
          </Box>
          <Box mr={3} flexShrink={0}>
            <Rotate>
              <CogIcon size={'32px'} color={'grey'} onClick={props.onSettingsClicked} />
            </Rotate>
          </Box>
        </Flex>
      </Flex>
    </Background>
  );
}
