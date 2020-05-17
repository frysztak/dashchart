import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

import Signika from '../assets/fonts/Signika.woff2';
import SignikaLight from '../assets/fonts/Signika-Light.woff2';

export default createGlobalStyle`
${normalize}

@font-face {
font-family: 'Signika';
src: local('Signika'), url(${Signika}) format('woff2')
}

@font-face {
font-family: 'Signika Light';
src: local('Signika Light'), url(${SignikaLight}) format('woff2')
}

body {
font-family: 'Signika',sans-serif;
height: 100%;
}

* {
scrollbar-width: thin;
}

html {
height: 100%;
}

#root {
height: 100%;
}

#__next {
height: 100%;
}
`;
