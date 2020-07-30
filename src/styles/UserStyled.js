import styled from 'styled-components'

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 215px);
  position: absolute;
  left: 215px;

  & > h2 {
    font-size: 3vmin;
  }

  & .views {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: begin;

    & .active-sessions {
      width: 40%;
      border: 1px solid gray;
      border-radius: 14px;
      padding: 2%;
      margin: 1%;

      & .session {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 1%;

        & .data {
          font-size: 1.5vmin;
        }

        & .delete {
          padding: 2%;
          cursor: pointer;
        }
      }

      & .title {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    & .change-password {
      border: 1px solid gray;
      border-radius: 14px;
      padding: 2%;
      margin: 1%;

      & .title {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & .submit-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 6%;
      }
    }

    & .perfil {
      width: 20%;
      border: 1px solid gray;
      border-radius: 14px;
      padding: 2%;
      margin: 1%;

      & .input {
        width: 100%;
      }

      & .title {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & .field {
        margin: 3%;
      }
    }
  }

  & .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  & .actions {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & .action {
      margin: 1%;
    }
  }
`
