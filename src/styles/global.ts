import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    font: 400 16px sans-serif;
    background-color: #222;
    color: #eee;
  }

  button {
    border: none;
    background: none;
    color: inherit;
    font: inherit;

    &:not(:disabled) {
      cursor: pointer;
    }
  }
`
