import baseStyled, { ThemedStyledInterface, useTheme as useThemeStyled } from 'styled-components';
import React from 'react';
import { darken } from 'polished';

const colors = {
  black: '#000',
  almostWhite: '#FDFDFD',
  lightGrey: '#F5F7FB',
  grey: '#999999',
  grey2: '#CCCCCC',

  pink: '#e7d8d8',
  palePink: '#F7F2F2',
  darkPink: '#CAA9A9',

  blue: '#46539E',
  paleBlue: '#AFB6DC',

  red: '#C1292E',
  yellow: '#f1d302',
};

export const theme = {
  colors,
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
    blur: '10px',
    color: 'rgba(0,0,0,0.3)',
  },
  previewCard: {
    width: 350,
    height: 200,
  },
  buttons: {
    primary: {
      bg: 'darkPink',
      color: 'almostWhite',
      '&:hover': {
        cursor: 'pointer',
        bg: darken(0.1, colors.darkPink),
        transition: 'background-color 0.25s ease',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export type ThemeColors = keyof Theme['colors'];
export const useTheme = useThemeStyled as () => Theme;
