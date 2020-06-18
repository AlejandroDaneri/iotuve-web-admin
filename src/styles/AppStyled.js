import styled from 'styled-components'

export const AppWrapper = styled.section`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: calc(10px + 1vmin);
  color: #61dafb;

  & > h1 {
    font-size: 4vmin;
  }

  & > h2 {
    font-size: 3vmin;
  }

  & > h3 {
    font-size: 2vmin;
  }

  & > h4 {
    font-size: 1vmin;
  }

  & > input {
    margin: 0.4%;
    padding: 0.3% 1%;
    border: 2px solid #61dafb;
    background-color: #282c34;
    color: #61dafb;
    font-size: calc(10px + 1vmin);
  }

  & .button {
    background-color: #61dafb;
    border-color: #61dafb;
    color: black;
    cursor: pointer;
    width: 20%;
  }

  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
  }

  > a,
  a:link,
  a:visited {
    color: black;
    text-decoration: none;
  }

  & .menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    & > span {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      padding: 2%;
    }
  }
`
