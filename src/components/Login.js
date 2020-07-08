/* Import Libs */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import Particles from 'react-particles-js'

/* Import Styled Components */
import { LoginWrapper } from '../styles/LoginFormStyled'

/* Import WebApi */
import { doAuth } from '../webapi'

/* Import Constants */
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  COLOR_ERROR,
  COLOR_PRIMARY
} from '../constants'

import ParticlesConfig from '../ParticlesConfig'
import Button from '@material-ui/core/Button'

const Login = () => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [authing, changeAuthing] = useState(false)
  const [authError, changeAuthError] = useState(false)

  const dispatch = useDispatch()

  function onSubmit (e) {
    e.preventDefault()
    dispatch({ type: AUTH_REQUEST })
    changeAuthing(true)
    doAuth({ username: username, password: password })
      .then(response => {
        const { data } = response
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            token: data.session_token,
            username: data.username
          }
        })
        changeAuthing(false)
      })
      .catch(_ => {
        console.error('Auth Fail')
        changeAuthing(false)
        changeAuthError(true)
      })
  }

  return (
    <LoginWrapper>
      <Particles className='particles' params={ParticlesConfig} />
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit}>
        <input
          name='username'
          value={username}
          onChange={e => changeUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          name='password'
          value={password}
          onChange={e => changePassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
        {authing ? (
          <div className='loader'>
            <CircleLoader size={60} color={COLOR_PRIMARY} />
          </div>
        ) : (
          <Button
            variant='contained'
            style={{ backgroundColor: COLOR_PRIMARY }}
            onClick={onSubmit}
          >
            Ingresar
          </Button>
        )}
        <Snackbar
          open={authError}
          onClose={() => changeAuthError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message='Usuario o contraseña incorrectos'
            style={{
              color: 'black',
              backgroundColor: COLOR_ERROR,
              fontSize: '14px'
            }}
          />
        </Snackbar>
      </form>
    </LoginWrapper>
  )
}

export default Login
