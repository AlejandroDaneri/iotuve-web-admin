import styled from 'styled-components'

export const CommentsWrapper = styled.div`
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
`
