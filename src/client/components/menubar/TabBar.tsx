import React from 'react';
import { Text, Flex, Box } from 'rebass';
import { styled } from '../../config/Theme';
import { MenuItem, MenuItemNames } from './MenuItems';
import { keyframes } from 'styled-components';

export interface TabBarProps {
  currentMenuItem: MenuItem;
  onItemClicked: (item: MenuItem) => void;
}

export function TabBar(props: TabBarProps) {
  return (
    <>
      {[MenuItem.DATAFRAMES, MenuItem.CHARTS, MenuItem.DASHBOARDS].map((menuItem: MenuItem) => (
        <TabBarItem
          menuItem={menuItem}
          isActive={menuItem === props.currentMenuItem}
          key={menuItem}
          onItemClicked={() => props.onItemClicked(menuItem)}
        />
      ))}
    </>
  );
}

interface TabBarItemProps {
  menuItem: MenuItem;
  isActive: boolean;
  onItemClicked: () => void;
}

const TabBarItemName = styled(Text)<{ active: boolean }>`
  color: ${p => (p.active ? p.theme.colors.black : p.theme.colors.grey2)};
  transition: color 0.15s ease;
`;

const opacity = keyframes`
  from {
  opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ActiveIndicator = styled(Box)`
  height: 1px;
  width: 100%;
  background-color: ${p => p.theme.colors.blue};
  animation: ${opacity} 0.15s ease;
`;

function TabBarItem(props: TabBarItemProps) {
  return (
    <Flex flexDirection={'column'} height={'100%'}>
      <Flex flex={1} alignItems={'center'}>
        <TabBarItemName fontSize={3} mx={4} active={props.isActive} onClick={props.onItemClicked}>
          {MenuItemNames[props.menuItem]}
        </TabBarItemName>
      </Flex>
      {props.isActive && <ActiveIndicator />}
    </Flex>
  );
}
