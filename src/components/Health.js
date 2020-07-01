/* Import Libs */
import React, { useState, useEffect } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

/* Import Styled Components */
import { HealthWrapper } from '../styles/HealthStyled'

/* Import WebApi */
import { getMediaStatus, getAppStatus, getAuthStatus } from '../webapi'
import { COLOR_PRIMARY } from '../constants'

const Health = () => {
  const [mediaStatus, changeMediaStatus] = useState('')
  const [appStatus, changeAppStatus] = useState('')
  const [authStatus, changeAuthStatus] = useState('')

  useEffect(() => {
    getMediaStatus()
      .then(_ => {
        changeMediaStatus('UP')
      })
      .catch(_ => {
        console.error('Media status request fail')
        changeMediaStatus('DOWN')
      })

    getAppStatus()
      .then(_ => {
        changeAppStatus('UP')
      })
      .catch(_ => {
        console.error('App status request fail')
        changeAppStatus('DOWN')
      })

    getAuthStatus()
      .then(_ => {
        changeAuthStatus('UP')
      })
      .catch(_ => {
        console.error('App status request fail')
        changeAuthStatus('DOWN')
      })
  }, [])

  return (
    <HealthWrapper>
      <h2>Estado</h2>
      {mediaStatus && appStatus && authStatus ? (
        <table>
          <thead>
            <tr>
              <th>Server</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Media</td>
              <td>{mediaStatus}</td>
            </tr>
            <tr>
              <td>App</td>
              <td>{appStatus}</td>
            </tr>
            <tr>
              <td>Auth</td>
              <td>{authStatus}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
    </HealthWrapper>
  )
}

export default Health
