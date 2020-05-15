import React, { useState } from 'react'
import { LoginWrapper } from '../styles/LoginFormStyled'
import { doAuth } from '../webapi'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'

const Login = () => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [authing, changeAuthing] = useState(false)

  const dispatch = useDispatch()

  function onSubmit (e) {
    e.preventDefault()
    changeAuthing(true)
    doAuth({ username: username, password: password })
      .then(_ => {
        dispatch({
          type: 'AUTH_SUCCESS'
        })
        changeAuthing(false)
      })
      .catch(_ => {
        console.error('Auth Fail')
        changeAuthing(false)
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
      {authing ? (
        <div className='loader'>
          <CircleLoader size={60} color='#61dafb' />
        </div>
      ) : (
        <button type='submit'>Log In</button>
      )}
    </LoginWrapper>
  )
}

export default Login
