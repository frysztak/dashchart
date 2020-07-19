import React from 'react';
import { select, withKnobs, boolean } from '@storybook/addon-knobs';
import { MenuItem } from './MenuItems';
import { TabBarProps, TabBar } from './TabBar';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

export default { title: 'TabBar', decorators: [withKnobs] };

const Background = styled.div`
  height: 64px;
  width: 100%;
  background-color: #606582;
`;

export const TabBarStory = () => {
  const props: TabBarProps = {
    projectSelected: boolean('projectSelected', true),
    currentMenuItem: select('currentMenuItem', MenuItem, MenuItem.CHARTS),
    onItemClicked: (menuItem: MenuItem) => console.log(`Item ${menuItem} clicked`),
  };

  return (
    <Background>
      <Flex height={'100%'} alignItems={'center'}>
        <TabBar {...props} />
      </Flex>
    </Background>
  );
};
