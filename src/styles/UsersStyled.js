import styled from 'styled-components'

export const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > h2 {
    font-size: 3vmin;
  }

  > table {
    width: 90%;
    text-align: center;

    > thead {
      > tr {
        > th {
          border-bottom: 1px solid #61dafb;
        }
      }
    }

    > tbody {
      > tr {
        & > td.actions {
          cursor: pointer;
        }
      }
    }
  }
`
