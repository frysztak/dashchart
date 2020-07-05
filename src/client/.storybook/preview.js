import { addDecorator } from '@storybook/react';
import GlobalStyle from '../config/GlobalStyle';
import React from 'react';
import { theme } from '../config/Theme';
import { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from '../store/store';
import { Provider } from 'react-redux';

addDecorator(s => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>{s()}</DndProvider>
      </Provider>
    </ThemeProvider>
  </>
));
