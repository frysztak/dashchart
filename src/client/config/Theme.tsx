import baseStyled, { ThemedStyledInterface } from 'styled-components';
import React from 'react';

export const theme = {
  colors: {
    black: '#000',
    lightGrey: '#F5F7FB',
    grey: '#999999',
    grey2: '#CCCCCC',

    pink: '#e7d8d8',
    palePink: '#F7F2F2',
    darkPink: '#CAA9A9',

    blue: '#46539E',
  },
  fonts: {
    light: "'Signika Light', sans-serif",
  },
  dropZone: {
    borderRadius: '16px',
    animTime: '0.25s',
    height: '24px',
    width: '60%',
    margin: '56px',
    bgMargin: '32px',
  },
  boxShadow: {
    offsetX: '5px',
    offsetY: '5px',
    spread: '5px',
    blur: '5px',
    color: '#333',
  },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export type ThemeColors = keyof Theme['colors'];
