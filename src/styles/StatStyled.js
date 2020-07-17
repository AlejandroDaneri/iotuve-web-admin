import styled from 'styled-components'

export const StatWrapper = styled.div`
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

  & .time-range {
    display: flex;
    border: 1px solid white;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    & .date {
      margin: 2%;
    }
  }

  & .chart {
    width: 90%;
  }
`
