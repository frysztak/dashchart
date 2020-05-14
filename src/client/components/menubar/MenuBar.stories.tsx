import React from 'react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { MenuBarProps, MenuBar } from './MenuBar';
import { MenuItem } from './MenuItems';

export default { title: 'MenuBar', decorators: [withKnobs] };

export const MenuBarStory = () => {
  const props: MenuBarProps = {
    projectName: 'Project #1',
    currentMenuItem: select('currentMenuItem', MenuItem, MenuItem.CHARTS),
    onBackClicked: () => console.log('Back clicked'),
    onItemClicked: (menuItem: MenuItem) => console.log(`Item ${menuItem} clicked`),
    onUserClicked: () => console.log('User clicked'),
    onNotificationsClicked: () => console.log('Notifications clicked'),
    onSettingsClicked: () => console.log('Settings clicked'),
  };

  return <MenuBar {...props} />;
};
