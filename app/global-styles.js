import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    color:#fff; font-size:16px; font-family: 'Poppins', sans-serif; font-weight:400;
  }

  body.fontLoaded {
    color:#fff; font-size:16px; font-family: 'Poppins', sans-serif; font-weight:400;
  }

  img{ max-width:100%;}
`;

export default GlobalStyle;
