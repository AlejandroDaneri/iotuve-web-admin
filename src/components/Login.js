import React, { useState } from 'react'
import { LoginWrapper } from '../styles/LoginFormStyled'
import { doAuth } from '../webapi'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import Particles from 'react-particles-js'
import ParticlesConfig from '../ParticlesConfig'

const Login = () => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [authing, changeAuthing] = useState(false)
  const [authError, changeAuthError] = useState(false)

  const dispatch = useDispatch()

  function onSubmit (e) {
    e.preventDefault()
    changeAuthing(true)
    doAuth({ username: username, password: password })
      .then(response => {
        const { data } = response
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            token: data.session_token
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
      <h3>Iniciar Sesion</h3>
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
            <CircleLoader size={60} color='#61dafb' />
          </div>
        ) : (
          <button type='submit'>Enviar</button>
        )}
        <Snackbar
          open={authError}
          onClose={() => changeAuthError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message='Usuario o Contraseña incorrectos'
            style={{
              color: 'black',
              backgroundColor: '#61dafb',
              fontSize: '14px'
            }}
          />
        </Snackbar>
      </form>
    </LoginWrapper>
  )
}

export default Login
