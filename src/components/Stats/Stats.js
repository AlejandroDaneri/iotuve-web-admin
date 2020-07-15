/* Import Libs */
import React from 'react'

/* Import Components */
import StatsTotal from './StatsTotal'
import StatsPartial from './StatsPartial'

/* Import Styled Components */
import { StatsWrapper } from '../../styles/StatsStyled'

const Stats = () => {
  return (
    <StatsWrapper>
      <h2>Estadisticas</h2>
      <div className='stats'>
        <StatsTotal />
        <StatsPartial />
      </div>
    </StatsWrapper>
  )
}

export default Stats
