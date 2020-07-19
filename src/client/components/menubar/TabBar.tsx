import React from 'react';
import { Box, Flex, Text } from 'rebass';
import { styled } from '../../config/Theme';
import { MenuItem, MenuItemNames } from './MenuItems';
import { keyframes } from 'styled-components';

export interface TabBarProps {
  projectSelected: boolean;
  currentMenuItem: MenuItem;
  onItemClicked: (item: MenuItem) => void;
}

export function TabBar(props: TabBarProps) {
  return (
    <>
      {[MenuItem.PROJECTS, MenuItem.DATAFRAMES, MenuItem.CHARTS, MenuItem.DASHBOARDS].map((menuItem: MenuItem) => (
        <TabBarItem
          menuItem={menuItem}
          isActive={menuItem === props.currentMenuItem}
          isDisabled={menuItem !== MenuItem.PROJECTS && !props.projectSelected}
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
  isDisabled?: boolean;
  onItemClicked: () => void;
}

const ItemContainer = styled(Flex)<{ isDisabled: boolean }>`
  cursor: ${p => (p.isDisabled ? '' : 'pointer')};
`;

const TabBarItemName = styled(Text)<{ isActive: boolean; isDisabled: boolean }>`
  color: ${p => (p.isActive ? p.theme.colors.black : p.theme.colors.grey2)};
  transition: color 0.15s ease;
  opacity: ${p => (p.isDisabled ? 0.3 : 1)};

  ${ItemContainer}:hover & {
    color: ${p => (p.isActive || p.isDisabled ? '' : p.theme.colors['grey'])};
  }
`;

const opacity = keyframes`
  from {
  opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ActiveIndicator = styled(Box)<{ isActive: boolean }>`
  height: 1px;
  width: 90%;
  background-color: ${p => p.theme.colors[p.isActive ? 'blue' : 'lightGrey']};
  border-radius: 16px;
  animation: ${opacity} 0.15s ease;
  transition: background-color 0.15s ease;

  ${ItemContainer}:hover & {
    background-color: ${p => (p.isActive ? '' : p.theme.colors['paleBlue'])};
  }
`;

function TabBarItem(props: TabBarItemProps) {
  const isDisabled = props.isDisabled || false;
  return (
    <ItemContainer flexDirection={'column'} height={'100%'} isDisabled={isDisabled}>
      <Flex flex={1} alignItems={'center'}>
        <TabBarItemName
          fontSize={3}
          mx={4}
          isActive={props.isActive}
          isDisabled={isDisabled}
          onClick={props.onItemClicked}
        >
          {MenuItemNames[props.menuItem]}
        </TabBarItemName>
      </Flex>
      <Flex justifyContent={'center'}>{!isDisabled && <ActiveIndicator isActive={props.isActive} />}</Flex>
    </ItemContainer>
  );
}
