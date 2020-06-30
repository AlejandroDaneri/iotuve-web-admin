/* Import Libs */
import React, { useEffect } from 'react'

/* Import Styled Components */
import { StatsWrapper } from '../styles/StatsStyled'
import { getStats } from '../webapi'

const Stats = () => {
  useEffect(() => {
    getStats()
      .then(_ => {
        console.error('Get Stats Successs')
      })
      .catch(_ => {
        console.error('Get Stats Error')
      })
  }, [])
  return (
    <StatsWrapper>
      <h2>Estadisticas</h2>
    </StatsWrapper>
  )
}

export default Stats
