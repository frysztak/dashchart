import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

export default createGlobalStyle`
${normalize}

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

input[type='number'] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`;
