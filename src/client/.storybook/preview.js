import { addDecorator } from '@storybook/react';
import GlobalStyle from '../components/GlobalStyle';
import React from 'react';
import Theme from '../components/Theme';

addDecorator(s => (
  <>
    <GlobalStyle />
    <Theme>{s()}</Theme>
  </>
));
