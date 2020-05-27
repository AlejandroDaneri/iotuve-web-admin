import styled from 'styled-components'

export const ChangePasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  & > h2 {
    font-size: 3vmin;
  }

    & > form {
      border: 1px solid #61dafb;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 30%;

      & .loader {
        padding: 5%;
      }

      & > input {
        margin: 1%;
        padding: 1%;
        width: 80%;
      }

      & .submit {
        margin: 2%;
        transition: background-color 0.5s ease;
        background-color: ${({ valid }) => (valid ? '#61dafb' : 'gray')};
        border: 0;
        color: black;
        cursor: ${({ valid }) => (valid ? 'pointer' : '')};;
        width: 40%;
      }
    }
  }
`
