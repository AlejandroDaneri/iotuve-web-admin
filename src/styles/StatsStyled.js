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

  & .stats {
    display: flex;
    flex-direction: column;
    width: calc(100% - 215px);

    & .total {
      display: flex;
      flex-direction: column;
      width: 100%;

      & .pies {
        display: flex;
        width: 100%;
        padding: 1%;

        & .pie {
          width: 50%;
        }
      }
    }

    & .partial {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

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
        width: 70%;
      }
    }

    & .numerical {
    }

    & .charts {
      display: flex;
      width: 100%;
    }
  }
`
