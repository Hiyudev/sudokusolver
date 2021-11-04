import {createGlobalStyle} from 'styled-components';
const GlobalStyle = createGlobalStyle`
  

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    transition: background-color 0.3s;
  }

  input {
    border:none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  button {
    margin: 0;
    border: 0;
    font: inherit;
    cursor: pointer;
  }
`;

export default GlobalStyle;
