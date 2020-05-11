import styled from 'styled-components'

export const LoginWrapper = styled.form`
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
`
