import styled from 'styled-components'

export const HealthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > h2 {
    font-size: 3vmin;
  }

  & .status {
    padding: 2%;
  }
`
