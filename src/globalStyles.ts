import { primaryFont, secondFont } from 'constants/fonts';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: ${secondFont};
  }

  body {
    margin: 0;
  }

  h1, h2, h3, h4 {
    margin: 0;
    font-family: ${primaryFont};
  }

  p {
    margin: 0;
  }

  button {
    font-family: ${secondFont};
    cursor: pointer;
    padding: 0;
  }

  button, input, select {
    border: none;
    outline: 0;
    background-color: transparent;
  }
`;

export default GlobalStyles;
