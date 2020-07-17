import styled from 'styled-components'

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 215px);
  position: absolute;
  left: 215px;
  background-color: #282c34;

  & > h2 {
    font-size: 3vmin;
  }

  & .options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: calc(100% - 215px);

    & .option {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 3%;

      & .picture {
        margin-bottom: 4%;
      }
    }
  }
`
