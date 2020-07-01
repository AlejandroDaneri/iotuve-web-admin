/* Import Libs */
import React, { useState, useEffect } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

/* Import Styled Components */
import { HealthWrapper } from '../styles/HealthStyled'
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp'
import ArrowDownwardSharpIcon from '@material-ui/icons/ArrowDownwardSharp'

/* Import WebApi */
import { getMediaStatus, getAppStatus, getAuthStatus } from '../webapi'

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

  useEffect(() => {
    const interval = setInterval(() => {
      getAppStatus()
      getMediaStatus()
      getAuthStatus()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return mediaStatus && appStatus && authStatus ? (
    <div>
      <p>
        Media:{' '}
        {mediaStatus === 'UP' ? (
          <ArrowUpwardSharpIcon />
        ) : (
          <ArrowDownwardSharpIcon />
        )}{' '}
      </p>
      <p>
        App:{' '}
        {appStatus === 'UP' ? (
          <ArrowUpwardSharpIcon />
        ) : (
          <ArrowDownwardSharpIcon />
        )}
      </p>
      <p>
        Auth:{' '}
        {authStatus === 'UP' ? (
          <ArrowUpwardSharpIcon />
        ) : (
          <ArrowDownwardSharpIcon />
        )}
      </p>
    </div>
  ) : (
    <CircleLoader color='#61dafb' size={150} />
  )
}

export default Health
