import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
//html { font-size: 10px; },
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    color:#fff; font-size:16px; font-family: 'Poppins', sans-serif; font-weight:400;
  }

  .song-border {
    border-image: linear-gradient(to right, #1fdbae, rgba(31, 219, 174, 0.2)) 1;
  }

  img{ max-width:100%;}
`;

export default GlobalStyle;
