import { addDecorator } from '@storybook/react';
import GlobalStyle from '../components/GlobalStyle';
import React from 'react';

addDecorator(s => (
  <>
    <GlobalStyle />
    {s()}
  </>
));
