import React, { useState, useEffect } from 'react'
import { HealthWrapper } from '../styles/HealthStyled'
import { getMediaStatus, getAppStatus, getAuthStatus } from '../webapi'
import CircleLoader from 'react-spinners/CircleLoader'

const Health = () => {
  const [mediaStatus, changeMediaStatus] = useState('')
  const [appStatus, changeAppStatus] = useState('')
  const [authStatus, changeAuthStatus] = useState('')

  useEffect(() => {
    getMediaStatus()
      .then(_ => {
        changeMediaStatus('Media Server UP')
      })
      .catch(_ => {
        console.error('Media status request fail')
        changeMediaStatus('Media Server DOWN')
      })

    getAppStatus()
      .then(_ => {
        changeAppStatus('App Server UP')
      })
      .catch(_ => {
        console.error('App status request fail')
        changeAppStatus('App Server DOWN')
      })

    getAuthStatus()
      .then(_ => {
        changeAuthStatus('Auth Server UP')
      })
      .catch(_ => {
        console.error('App status request fail')
        changeAuthStatus('Auth Server DOWN')
      })
  }, [])

  return (
    <HealthWrapper>
      <h2>Estado</h2>
      {mediaStatus && appStatus && authStatus ? (
        <div className='status'>
          <div>
            <div>{mediaStatus}</div>
            <div>{appStatus}</div>
            <div>{authStatus}</div>
          </div>
        </div>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </HealthWrapper>
  )
}

export default Health
