import React from 'react'

import { useDispatch } from 'react-redux'

import styled from 'styled-components'

export const LogOutWrapper = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 2%;
`

const LogOut = () => {
  const dispatch = useDispatch()

  function logOut () {
    dispatch({
      type: 'AUTH_LOGOUT'
    })
  }

  return (
    <LogOutWrapper onClick={() => logOut()} className='material-icons'>
      power_settings_new
    </LogOutWrapper>
  )
}

export default LogOut
