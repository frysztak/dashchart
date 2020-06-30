import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { MenuBar, MenuBarProps } from '../components/menubar/MenuBar';
import { MenuItem } from '../components/menubar/MenuItems';
import GlobalStyle from '../config/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { styled, theme } from '../config/Theme';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { useCurrentProjectFromStore } from '../store/selectors';
import { Project } from '../store/project';
import { useRouter } from 'next/router';
import { Box, Flex } from 'reflexbox';
import { BottomBoxShadow } from '../components/misc/BoxShadow';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import '../assets/fonts/font.css';
import { routes } from '../config/routes';

const ElevatedBox = styled(Box)`
  z-index: 1;
`;

function findCurrentMenuItem(pathname: string): MenuItem {
  if (pathname.includes('chart')) {
    return MenuItem.CHARTS;
  } else if (pathname.includes('dataframe')) {
    return MenuItem.DATAFRAMES;
  }

  return MenuItem.PROJECTS;
}

function App({ children }: { children: ReactElement }) {
  const router = useRouter();
  const currentProject: Project | null = useCurrentProjectFromStore();

  const navigateToPage = (menuItem: MenuItem) => {
    switch (menuItem) {
      case MenuItem.PROJECTS: {
        const route = routes.projects;
        router.push(route.href, route.as);
        break;
      }
      case MenuItem.CHARTS: {
        if (currentProject) {
          const route = routes.charts(currentProject.id);
          router.push(route.href, route.as);
        }
        break;
      }
      case MenuItem.DATAFRAMES: {
        if (currentProject) {
          const route = routes.dataFrames(currentProject.id);
          router.push(route.href, route.as);
        }
        break;
      }
    }
  };

  const menuBarProps: MenuBarProps = {
    projectName: currentProject?.name || '',
    currentMenuItem: findCurrentMenuItem(router.pathname),
    onBackClicked: router.back,
    onItemClicked: navigateToPage,
    onUserClicked: () => console.log('User clicked'),
    onNotificationsClicked: () => console.log('Notifications clicked'),
    onSettingsClicked: () => console.log('Settings clicked'),
  };

  return (
    <Flex flexDirection={'column'} height={'100%'}>
      <ElevatedBox>
        <BottomBoxShadow>
          <MenuBar {...menuBarProps} />
        </BottomBoxShadow>
      </ElevatedBox>
      <Box flexGrow={1} overflowY={'hidden'}>
        {children}
      </Box>
    </Flex>
  );
}

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <DndProvider backend={Backend}>
            <App>
              <Component {...pageProps} />
            </App>
          </DndProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};
