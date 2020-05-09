import styled from 'styled-components'

export const AppWrapper = styled.section`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #61dafb;

  > h1 {
    font-size: 50px;
  }

  .link {
    width: 10%;
  }

  > a,
  a:link,
  a:visited {
    color: white;
    text-decoration: none;
  }

  & .menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`
