import React, { useState } from 'react'
import { LoginWrapper } from '../styles/LoginFormStyled'

const Login = () => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')

  function onSubmit (e) {
    e.preventDefault()
  }

  return (
    <LoginWrapper onSubmit={onSubmit}>
      <input
        value={username}
        onChange={e => changeUsername(e.target.value)}
        placeholder='Username'
      />
      <input
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
