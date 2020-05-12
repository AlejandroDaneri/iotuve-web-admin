import React from 'react'
import { Button } from '../styles/ButtonStyled'
import { HealthWrapper } from '../styles/HealthStyled'
import { Link } from 'react-router-dom'

const Health = () => {
  return (
    <HealthWrapper>
      <Link to='/' className='link'>
        <Button>Home</Button>
      </Link>
    </HealthWrapper>
  )
}

export default Health
