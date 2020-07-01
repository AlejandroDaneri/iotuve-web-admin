/* Import Libs */
import React, { useState, useEffect } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

/* Import Styled Components */
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

/* Import WebApi */
import { getMediaStatus, getAppStatus, getAuthStatus } from '../webapi'
import { COLOR_PRIMARY } from '../constants'
import { HealthWrapper } from '../styles/HealthStyled'

const Health = () => {
  const time = new Date()
  const [mediaStatus, changeMediaStatus] = useState('')
  const [appStatus, changeAppStatus] = useState('')
  const [authStatus, changeAuthStatus] = useState('')
  const [showTime, changeShowTime] = useState(
    `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  )

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
      changeShowTime(
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      )
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return mediaStatus && appStatus && authStatus ? (
    <HealthWrapper>
      <center>
        <p>
          Media:{' '}
          {mediaStatus === 'UP' ? (
            <FiberManualRecordIcon style={{ color: 'green' }} />
          ) : (
            <FiberManualRecordIcon style={{ color: 'red' }} />
          )}{' '}
        </p>
        <p>
          App:{' '}
          {appStatus === 'UP' ? (
            <FiberManualRecordIcon style={{ color: 'green' }} />
          ) : (
            <FiberManualRecordIcon style={{ color: 'red' }} />
          )}
        </p>
        <p>
          Auth:{' '}
          {authStatus === 'UP' ? (
            <FiberManualRecordIcon style={{ color: 'green' }} />
          ) : (
            <FiberManualRecordIcon style={{ color: 'red' }} />
          )}
        </p>
        Ult. actualización {showTime}
      </center>
    </HealthWrapper>
  ) : (
    <CircleLoader color={COLOR_PRIMARY} size={150} />
  )
}

export default Health
