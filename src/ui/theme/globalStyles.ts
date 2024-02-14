import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background-color: #292929;
  }
  h1{
    font-size: 5rem;
    color: #fff;
  }
  h2{
    font-size: 2rem;
    color: #fff;
  }
`;
 
export default GlobalStyle;