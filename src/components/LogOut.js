import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

import { getUsername } from '../stateapi/auth'

export const LogOutWrapper = styled.div`
  margin: 2%;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  display: flex;

  & .username {
    color: white;
    margin-right: 6%;
  }
`

const LogOut = () => {
  const username = useSelector(getUsername)
  const dispatch = useDispatch()

  function logOut () {
    dispatch({
      type: 'AUTH_LOGOUT'
    })
  }

  return (
    <LogOutWrapper>
      <div className='username'>{username}</div>
      <span onClick={() => logOut()} className='material-icons'>
        power_settings_new
      </span>
    </LogOutWrapper>
  )
}

export default LogOut
