import React, { useState } from 'react'
import { LoginWrapper } from '../styles/LoginFormStyled'
import { doAuth } from '../webapi'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')

  const dispatch = useDispatch()

  function onSubmit (e) {
    e.preventDefault()

    doAuth({ username: username, password: password })
      .then(_ => {
        dispatch({
          type: 'AUTH_SUCCESS'
        })
      })
      .catch(_ => {
        console.error('Auth Fail')
      })
  }

  return (
    <LoginWrapper onSubmit={onSubmit}>
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
      <button type='submit'>Log In</button>
    </LoginWrapper>
  )
}

export default Login
