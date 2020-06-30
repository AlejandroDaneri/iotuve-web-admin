/* Import Libs */
import React, { useEffect, useState } from 'react'

/* Import Styled Components */
import { StatsWrapper } from '../styles/StatsStyled'
import { getStats } from '../webapi'

const Stats = () => {
  const startDate = '2020-04-29'
  const endDate = '2020-05-30'

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

      <div>Sesiones Activas: {activeSessions}</div>
      <div>Links de Recuperar Contraseña Activos: {activeRecovery}</div>

      <p />

      <h3>Usuarios Admin</h3>
      <div>Registrados: {registeredAdminUsers}</div>
      <div>Registrados Activos: {registeredAdminUsersActive}</div>
      <div>Registrados Cerrados: {registeredAdminUsersClosed}</div>

      <p />

      <h3>Usuarios</h3>
      <div>Registrados: {registeredUsers}</div>
      <div>Registrados Activos: {registeredUsersActive}</div>
      <div>Registrados Cerrados: {registeredUsersClosed}</div>
      <div>
        Registrados con Login Service: {registeredAdminUsersLoginService}
      </div>
    </StatsWrapper>
  )
}

export default Stats
