import React, { useState, useEffect } from 'react'
import { Button } from '../styles/ButtonStyled'
import { HealthWrapper } from '../styles/HealthStyled'
import { Link } from 'react-router-dom'
import { getMediaStatus, getAppStatus, getAuthStatus } from '../webapi'

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
      <Link to='/' className='link'>
        <Button>Home</Button>
      </Link>
      <div className='status'>
        <div>{mediaStatus}</div>
        <div>{appStatus}</div>
        <div>{authStatus}</div>
      </div>
    </HealthWrapper>
  )
}

export default Health
