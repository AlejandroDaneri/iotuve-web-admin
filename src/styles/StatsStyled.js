import styled from 'styled-components'

export const StatsWrapper = styled.div`
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

  & .stats {
    display: flex;
    flex-direction: column;

    & .time-range {
      display: flex;
      border: 1px solid white;
      align-items: center;
      justify-content: flex-start;

      & .date {
        margin: 2%;
      }
    }

    & .numerical {
      display: flex;
      flex-direction: row;

      & .stat {
        padding: 1%;
      }
    }

    & .charts {
      display: flex;
      width: 100%;
    }
  }
`
