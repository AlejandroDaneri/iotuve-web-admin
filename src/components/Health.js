/* Import Libs */
import React, { useState, useEffect } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

/* Import Styled Components */
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

/* Import WebApi */
import { getMediaStatus, getAppStatus, getAuthStatus } from '../webapi'
import { COLOR_PRIMARY } from '../constants'
import { HealthWrapper } from '../styles/HealthStyled'

function pad (d) {
  return d < 10 ? '0' + d.toString() : d.toString()
}
const Health = () => {
  const time = new Date()
  const [mediaStatus, changeMediaStatus] = useState('')
  const [appStatus, changeAppStatus] = useState('')
  const [authStatus, changeAuthStatus] = useState('')
  const [showTime, changeShowTime] = useState(
    `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(
      time.getSeconds()
    )}`
  )

  function status (service, status) {
    return (
      <div className='containerStatus'>
        <div className='serviceName'>{service}: </div>
        <div className='service'>
          {status === 'UP' ? (
            <FiberManualRecordIcon style={{ color: 'green' }} />
          ) : (
            <FiberManualRecordIcon style={{ color: 'red' }} />
          )}
        </div>
      </div>
    )
  }

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
        `${pad(new Date().getHours())}:${pad(new Date().getMinutes())}:${pad(
          new Date().getSeconds()
        )}`
      )
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return mediaStatus && appStatus && authStatus ? (
    <HealthWrapper>
      <center>
        {status('Media', mediaStatus)}
        {status('App', appStatus)}
        {status('Auth', authStatus)}
        <br />
        Ult. actualización {showTime}
      </center>
    </HealthWrapper>
  ) : (
    <HealthWrapper>
      <center>
        <CircleLoader color={COLOR_PRIMARY} size={150} />
        <br />
        Obteniendo datos...
      </center>
    </HealthWrapper>
  )
}

export default Health
