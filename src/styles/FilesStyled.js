import styled from 'styled-components'

export const FilesWrapper = styled.div`
  background-color: #282c34;
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

  > table {
    width: 90%;
    text-align: center;

    > thead {
      > tr {
        > th {
          border-bottom: 1px solid #000000;
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
