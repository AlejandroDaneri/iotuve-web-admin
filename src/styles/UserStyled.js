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
