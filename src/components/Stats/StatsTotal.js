/* Import Libs */
import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'

/* Import WebApi */
import { getStats } from '../../webapi'

const StatsTotal = () => {
  const [activeRecovery, changeActiveRecovery] = useState()
  const [activeSessions, changeActiveSessions] = useState()

  const [
    registeredAdminUsersActive,
    changeRegisteredAdminUsersActive
  ] = useState()
  const [
    registeredAdminUsersClosed,
    changeRegisteredAdminUsersClosed
  ] = useState()

  const [registeredUsersActive, changeRegisteredUsersActive] = useState()
  const [registeredUsersClosed, changeRegisteredUsersClosed] = useState()

  const [
    registeredUsersLoginService,
    changeRegisteredUsersLoginService
  ] = useState()

  const doGetStats = () => {
    getStats('2020-04-04', '2020-04-04')
      .then(response => {
        const { data } = response

        changeActiveRecovery(data.active_recovery)
        changeActiveSessions(data.active_sessions)

        changeRegisteredAdminUsersActive(data.registered_adminusers_active)
        changeRegisteredAdminUsersClosed(data.registered_adminusers_closed)

        changeRegisteredUsersActive(data.registered_users_active)
        changeRegisteredUsersClosed(data.registered_users_closed)

        changeRegisteredUsersLoginService(data.registered_users_login_service)
      })
      .catch(_ => {
        console.error('Get Stats Error')
      })
  }

  useEffect(() => {
    doGetStats()
  }, []) //eslint-disable-line

  return (
    <div className='stats'>
      <h2>Totales</h2>
      <div className='numerical'>
        <div className='stat'>
          <h3>Sessiones & Links</h3>
          <div>
            Sesiones Activas: <b>{activeSessions}</b>
          </div>
          <div>
            Links de Recuperar Contraseña Activos: <b>{activeRecovery}</b>
          </div>
        </div>

        <div className='stat'>
          <h3>Usuarios Admin</h3>
          <Pie
            data={{
              labels: ['Registrados Activos', 'Registrados Cerrados'],
              datasets: [
                {
                  data: [
                    registeredAdminUsersActive,
                    registeredAdminUsersClosed
                  ],
                  backgroundColor: ['#36A2EB', '#FF6384'],
                  hoverBackgroundColor: ['#36A2EB', '#FF6384']
                }
              ]
            }}
          />
        </div>

        <div className='stat'>
          <h3>Usuarios</h3>
          <Pie
            data={{
              labels: ['Registrados Activos', 'Registrados Cerrados'],
              datasets: [
                {
                  data: [registeredUsersActive, registeredUsersClosed],
                  backgroundColor: ['#36A2EB', '#FF6384'],
                  hoverBackgroundColor: ['#36A2EB', '#FF6384']
                }
              ]
            }}
          />
          <div>
            Registrados con Login Service: <b>{registeredUsersLoginService}</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsTotal
