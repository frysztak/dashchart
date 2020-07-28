import React, { ReactElement, useContext } from 'react';
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
import { HTML5Backend } from 'react-dnd-html5-backend';
import Menu from 'react-burger-menu/lib/menus/slide';

import '../assets/fonts/font.css';
import { routes } from '../config/routes';
import { BurgerContext, BurgerProvider } from '../utils/BurgerContext';
import { State } from 'react-burger-menu';
import { TabBar } from '../components/menubar/TabBar';
import Hide from '../components/misc/Hide';

const ElevatedBox = styled(Box)`
  z-index: 1;
`;

const StyledBurgerMenu = styled.div`
  .bm-menu {
    background: ${p => p.theme.colors.lightGrey};
    padding: 2.5em 1.5em 0;
    font-size: 2em;
    box-shadow: ${p => p.theme.boxShadow.offsetX} 0 ${p => p.theme.boxShadow.blur} -${p => p.theme.boxShadow.spread} ${p => p.theme.boxShadow.color};
  }
  .bm-cross-button {
    height: 30px;
    width: 15px;
  }
  .bm-cross {
    background: ${p => p.theme.colors.black};
  }
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
  const ctx = useContext(BurgerContext);

  const navigateToPage = (menuItem: MenuItem) => {
    ctx.stateChangeHandler({ isOpen: false });
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
    projectName: currentProject?.name || null,
    currentMenuItem: findCurrentMenuItem(router.pathname),
    onBackClicked: router.back,
    onItemClicked: navigateToPage,
    onUserClicked: () => console.log('User clicked'),
    onNotificationsClicked: () => console.log('Notifications clicked'),
    onSettingsClicked: () => console.log('Settings clicked'),
  };

  return (
    <Flex flexDirection={'column'} height={'100%'}>
      <StyledBurgerMenu>
        <Menu
          isOpen={ctx.isMenuOpen}
          customBurgerIcon={false}
          cursorCrossIcon={false}
          onStateChange={(state: State) => ctx.stateChangeHandler(state)}
        >
          <TabBar
            burgerMenu={true}
            currentMenuItem={menuBarProps.currentMenuItem}
            onItemClicked={menuBarProps.onItemClicked}
            projectSelected={menuBarProps.projectName !== null}
          />
        </Menu>
      </StyledBurgerMenu>
      <ElevatedBox>
        <BottomBoxShadow>
          <MenuBar {...menuBarProps} />
        </BottomBoxShadow>
      </ElevatedBox>
      <Box flexGrow={1} overflowY={'auto'}>
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
          <DndProvider backend={HTML5Backend}>
            <BurgerProvider>
              <App>
                <Component {...pageProps} />
              </App>
            </BurgerProvider>
          </DndProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};
