/* Import Libs */
import React, { useEffect, useState } from 'react'

/* Import Styled Components */
import { StatsWrapper } from '../styles/StatsStyled'
import { getStats } from '../webapi'

const Stats = () => {
  const startDate = '2020-04-29'
  const endDate = '2020-04-30'

  const [activeRecovery, changeActiveRecovery] = useState()
  const [activeSessions, changeActiveSessions] = useState()

  const [registeredAdminUsers, changeRegisteredAdminUsers] = useState()
  const [
    registeredAdminUsersActive,
    changeRegisteredAdminUsersActive
  ] = useState()
  const [
    registeredAdminUsersClosed,
    changeRegisteredAdminUsersClosed
  ] = useState()

  const [registeredUsers, changeRegisteredUsers] = useState()
  const [registeredUsersActive, changeRegisteredUsersActive] = useState()
  const [registeredUsersClosed, changeRegisteredUsersClosed] = useState()
  const [
    registeredAdminUsersLoginService,
    changeRegisteredAdminUsersLoginService
  ] = useState()

  useEffect(() => {
    getStats(startDate, endDate)
      .then(response => {
        const { data } = response
        console.error(data)
        changeActiveRecovery(data.active_recovery)
        changeActiveSessions(data.active_sessions)

        changeRegisteredAdminUsers(data.registered_adminusers)
        changeRegisteredAdminUsersActive(data.registered_adminusers_active)
        changeRegisteredAdminUsersClosed(data.registered_adminusers_closed)

        changeRegisteredUsers(data.registered_users)
        changeRegisteredUsersActive(data.registered_users_active)
        changeRegisteredUsersClosed(data.registered_users_closed)
        changeRegisteredAdminUsersLoginService(
          data.registered_users_login_service
        )
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

      <p />

      <div>Registered Admin Users: {registeredAdminUsers}</div>
      <div>Registered Admin Users Active: {registeredAdminUsersActive}</div>
      <div>Registered Admin Users Closed: {registeredAdminUsersClosed}</div>

      <p />

      <div>Registered Users: {registeredUsers}</div>
      <div>Registered Users Active: {registeredUsersActive}</div>
      <div>Registered Users Closed: {registeredUsersClosed}</div>
      <div>
        Registered Users with Login Service: {registeredAdminUsersLoginService}
      </div>
    </StatsWrapper>
  )
}

export default Stats
