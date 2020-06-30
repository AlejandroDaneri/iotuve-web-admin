/* Import Libs */
import React, { useEffect, useState } from 'react'

/* Import Styled Components */
import { StatsWrapper } from '../styles/StatsStyled'
import { getStats } from '../webapi'

const Stats = () => {
  const startDate = '2020-04-30'
  const endDate = '2020-05-31'

  const [activeRecovery, changeActiveRecovery] = useState()
  const [activeSessions, changeActiveSessions] = useState()

  useEffect(() => {
    getStats(startDate, endDate)
      .then(response => {
        const { data } = response
        console.error(data)
        changeActiveRecovery(data.active_recovery)
        changeActiveSessions(data.active_sessions)
      })
      .catch(_ => {
        console.error('Get Stats Error')
      })
  }, [])
  return (
    <StatsWrapper>
      <h2>Estadisticas</h2>
      <div>Active Recovery: {activeRecovery}</div>
      <div>Active Sessions: {activeSessions}</div>
    </StatsWrapper>
  )
}

export default Stats
