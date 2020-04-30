import { ThemeProvider } from 'styled-components';
import React, { ReactNode } from 'react';

const theme = {
  colors: {
    lightGrey: '#F5F7FB',
    pink: '#CAA9A9',
    palePink: '#F7F2F2',
  },
};

const Theme = ({ children }: { children: ReactNode }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
