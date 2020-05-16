import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { MenuBar, MenuBarProps } from '../components/menubar/MenuBar';
import { MenuItem } from '../components/menubar/MenuItems';
import GlobalStyle from '../config/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../config/Theme';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { useCurrentProject } from '../store/selectors';
import { Project } from '../store/project';

function App({ children }: { children: ReactElement }) {
  const currentProject: Project | null = useCurrentProject();

  const menuBarProps: MenuBarProps = {
    projectName: currentProject?.name || '',
    currentMenuItem: MenuItem.CHARTS,
    onBackClicked: () => console.log('Back clicked'),
    onItemClicked: (menuItem: MenuItem) => console.log(`Item ${menuItem} clicked`),
    onUserClicked: () => console.log('User clicked'),
    onNotificationsClicked: () => console.log('Notifications clicked'),
    onSettingsClicked: () => console.log('Settings clicked'),
  };

  return (
    <>
      <MenuBar {...menuBarProps} />
      {children}
    </>
  );
}

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App>
            <Component {...pageProps} />
          </App>
        </Provider>
      </ThemeProvider>
    </>
  );
};
