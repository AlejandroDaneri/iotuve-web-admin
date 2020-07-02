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
    align-items: center;

    & .active-sessions {
      border: 1px solid white;
      border-radius: 14px;
      padding: 2%;
      margin: 1%;

      & .title {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    & .change-password {
      border: 1px solid white;
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
      border: 1px solid white;
      border-radius: 14px;
      padding: 2%;
      margin: 1%;

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
