import styled from 'styled-components'

export const AppWrapper = styled.section`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #61dafb;

  & .login-form {
    margin: 2%;
    border: 1px solid #61dafb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;

    > input {
      margin: 1%;
      padding: 1%;
      width: 80%;
    }

    > button {
      margin: 2%;
      background-color: #61dafb;
      border: 0;
      color: black;
      cursor: pointer;
      width: 40%;
      font-size: calc(10px + 1vmin);
    }
  }

  > h1 {
    font-size: 50px;
  }

  & .form {
    margin: 2%;
    padding: 1%;
    border: 2px solid #61dafb;
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    align-items: center;

    > input {
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
    color: white;
    text-decoration: none;
  }

  & .menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`
