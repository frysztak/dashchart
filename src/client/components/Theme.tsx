import { ThemeProvider } from 'styled-components';
import React, { ReactNode } from 'react';

const theme = {
  colors: {
    lightGrey: '#F5F7FB',

    pink: '#e7d8d8',
    palePink: '#F7F2F2',
    darkPink: '#CAA9A9',
  },
};

const Theme = ({ children }: { children: ReactNode }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
