/* Import Libs */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Tooltip from '@material-ui/core/Tooltip'

/* Import StateApi */
import { getUsername } from '../stateapi/auth'

export const LogOutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8%;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;

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
          style={{ color: '#61dafb', padding: '2px', marginRight: '10px' }}
          onClick={() => logOut()}
        />
      </Tooltip>
    </LogOutWrapper>
  )
}

export default LogOut
