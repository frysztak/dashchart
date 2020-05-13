import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { MenuBarProps, MenuBar } from './MenuBar';
import { MenuItem } from './MenuItems';

export default { title: 'MenuBar', decorators: [withKnobs] };

export const MenuBarStory = () => {
  const props: MenuBarProps = {
    projectName: 'Project #1',
    currentMenuItem: select('currentMenuItem', MenuItem, MenuItem.CHARTS),
  };

  return <MenuBar {...props} />;
};
