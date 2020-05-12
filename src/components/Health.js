import React, { useState, useEffect } from 'react'
import { Button } from '../styles/ButtonStyled'
import { HealthWrapper } from '../styles/HealthStyled'
import { Link } from 'react-router-dom'
import { getMediaStatus } from '../webapi'

const Health = () => {
  const [status, changeStatus] = useState('')

  useEffect(() => {
    getMediaStatus()
      .then(response => {
        const { data } = response
        console.error(data)
        changeStatus('Media Server UP')
      })
      .catch(_ => {
        console.error('Status request fail')
        changeStatus('Media Server DOWN')
      })
  }, [])

  return (
    <HealthWrapper>
      <Link to='/' className='link'>
        <Button>Home</Button>
      </Link>
      <div className='status'>{status}</div>
    </HealthWrapper>
  )
}

export default Health
