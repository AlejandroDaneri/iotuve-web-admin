/* Import Libs */
import React, { useEffect } from 'react'

/* Import Styled Components */
import { StatsWrapper } from '../styles/StatsStyled'
import { getStats } from '../webapi'

const Stats = () => {
  const startDate = '2020-05-30'
  const endDate = '2020-05-31'

  useEffect(() => {
    getStats(startDate, endDate)
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
