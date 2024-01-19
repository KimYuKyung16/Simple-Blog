import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  input {
    outline: none;
    border: none;
   }

   button {
    outline: none;
    border: none;
   }

   textarea {
    resize: none;
    outline: none;
    border: none;
   }

   li {
    list-style: none;
   }

   a {
    text-decoration: none;
   }
`;

export default GlobalStyle;
