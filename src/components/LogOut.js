import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Tooltip from '@material-ui/core/Tooltip'

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
      <Tooltip title='Cerrar sesión'>
        <PowerSettingsNewIcon
          style={{ color: 'white', padding: '2px', marginRight: '10px' }}
          onClick={() => logOut()}
        />
      </Tooltip>
    </LogOutWrapper>
  )
}

export default LogOut
