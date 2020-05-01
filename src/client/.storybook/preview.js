import { addDecorator } from '@storybook/react';
import GlobalStyle from '../config/GlobalStyle';
import React from 'react';
import { theme } from '../config/Theme';
import { ThemeProvider } from 'styled-components';

addDecorator(s => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{s()}</ThemeProvider>
  </>
));
