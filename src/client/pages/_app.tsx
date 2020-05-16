import React from 'react';
import { AppProps } from 'next/app';
import { MenuBar, MenuBarProps } from '../components/menubar/MenuBar';
import { MenuItem } from '../components/menubar/MenuItems';
import GlobalStyle from '../config/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../config/Theme';

export default ({ Component, pageProps }: AppProps) => {
  const menuBarProps: MenuBarProps = {
    projectName: 'Project #1',
    currentMenuItem: MenuItem.CHARTS,
    onBackClicked: () => console.log('Back clicked'),
    onItemClicked: (menuItem: MenuItem) => console.log(`Item ${menuItem} clicked`),
    onUserClicked: () => console.log('User clicked'),
    onNotificationsClicked: () => console.log('Notifications clicked'),
    onSettingsClicked: () => console.log('Settings clicked'),
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MenuBar {...menuBarProps} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};
