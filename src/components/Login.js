import React, { useState } from 'react'
import { LoginWrapper } from '../styles/LoginFormStyled'
import { doAuth } from '../webapi'

const Login = () => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')

  function onSubmit (e) {
    e.preventDefault()

    doAuth({ username: username, password: password })
      .then(_ => {
        console.info('Auth Success')
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
