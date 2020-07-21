/* Import Libs */
import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import CircleLoader from 'react-spinners/CircleLoader'

/* Import WebApi */
import { getStatsTotal } from '../../webapi'

/* Import Styled Components */
import { StatWrapper } from '../../styles/StatStyled'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

const StatsTotal = () => {
  const [activeRecovery, changeActiveRecovery] = useState()
  const [activeSessions, changeActiveSessions] = useState()
  const [loading, changeLoading] = useState(true)

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
    getStatsTotal()
      .then(response => {
        const { data } = response

        changeActiveRecovery(data.active_recovery)
        changeActiveSessions(data.active_sessions)

        changeRegisteredAdminUsersActive(data.registered_adminusers_active)
        changeRegisteredAdminUsersClosed(data.registered_adminusers_closed)

        changeRegisteredUsersActive(data.registered_users_active)
        changeRegisteredUsersClosed(data.registered_users_closed)

        changeRegisteredUsersLoginService(data.registered_users_login_service)

        changeLoading(false)
      })
      .catch(_ => {
        changeLoading(false)
        console.error('Get Stats Error')
      })
  }

  useEffect(() => {
    doGetStats()
  }, []) //eslint-disable-line

  return (
    <StatWrapper>
      <h1>Estadisticas Totales</h1>
      {loading ? (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      ) : (
        <>
          <>
            <h3>Links y sesiones</h3>
            <div>
              Sesiones activas: <b>{activeSessions}</b>
            </div>
            <div>
              Links de recuperar contraseña activos: <b>{activeRecovery}</b>
            </div>
          </>

          <div className='charts'>
            <div className='chart'>
              <h3>Admins</h3>
              <Pie
                data={{
                  labels: ['Activos', 'Con cuenta cerrada'],
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
            <div className='chart'>
              <h3>Usuarios</h3>
              <Pie
                data={{
                  labels: [
                    'Activos',
                    'Con cuenta cerrada',
                    'Registrados con login service'
                  ],
                  datasets: [
                    {
                      data: [
                        registeredUsersActive - registeredUsersLoginService,
                        registeredUsersClosed,
                        registeredUsersLoginService
                      ],
                      backgroundColor: ['#36A2EB', '#FF6384', '#FFFF84'],
                      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFFF84']
                    }
                  ]
                }}
              />
            </div>
          </div>
        </>
      )}
    </StatWrapper>
  )
}

export default StatsTotal
