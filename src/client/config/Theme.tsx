import baseStyled, { ThemedStyledInterface } from 'styled-components';
import React from 'react';

export const theme = {
  colors: {
    lightGrey: '#F5F7FB',

    pink: '#e7d8d8',
    palePink: '#F7F2F2',
    darkPink: '#CAA9A9',
  },
  dropZone: {
    borderRadius: '16px',
    animTime: '0.25s',
    height: '16px',
    width: '60%',
    margin: '56px',
    bgMargin: '32px',
  },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
