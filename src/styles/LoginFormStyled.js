import styled from 'styled-components'

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  & > h2 {
    font-size: 3vmin;
  }

  & .particles {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  > form {
    z-index: 2;
    border: 1px solid #61dafb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;

    & .loader {
      padding: 5%;
    }

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
`
