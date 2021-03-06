/* Import Libs */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Tooltip from '@material-ui/core/Tooltip'

/* Import StateApi */
import { getUsername } from '../stateapi/auth'

/* Import Styled Components */
import { LogOutWrapper } from '../styles/LogOutStyled'

/* Import Constants */
import { AUTH_LOGOUT, COLOR_PRIMARY } from '../constants'
import { doLogOut } from '../webapi'

const LogOut = () => {
  const username = useSelector(getUsername)
  const dispatch = useDispatch()

  function logOut () {
    doLogOut()
      .then(_ => {
        dispatch({
          type: AUTH_LOGOUT
        })
      })
      .catch(_ => {})
  }

  return (
    <LogOutWrapper>
      <div className='username'>{username}</div>
      <Tooltip title='Cerrar sesión'>
        <PowerSettingsNewIcon
          style={{ color: COLOR_PRIMARY, padding: '2px', marginRight: '10px' }}
          onClick={() => logOut()}
        />
      </Tooltip>
    </LogOutWrapper>
  )
}

export default LogOut
