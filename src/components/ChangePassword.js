import React, { useState } from 'react'
import qs from 'qs'
import { doChangePassword } from '../webapi'
import { ChangePasswordWrapper } from '../styles/ChangePasswordStyled'

const ChangePassword = location => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')

  const { key } = qs.parse(location.location.search, {
    ignoreQueryPrefix: true
  })

  function onSubmit (e) {
    e.preventDefault()
    doChangePassword(key, username, password)
      .then(_ => {
        console.error('Change Password Success')
      })
      .catch(_ => {
        console.error('Change Password Error')
      })
  }

  return (
    <ChangePasswordWrapper onSubmit={onSubmit}>
      <input
        name='username'
        value={username}
        onChange={e => changeUsername(e.target.value)}
        placeholder='Nombre de Usuario'
      />
      <input
        name='password'
        value={password}
        onChange={e => changePassword(e.target.value)}
        placeholder='Contraseña'
      />
      <input
        name='confirm-password'
        value={confirmPassword}
        onChange={e => changeConfirmPassword(e.target.value)}
        placeholder='Confirmar Contraseña'
      />
      <button type='submit'>Cambiar Contraseña</button>
    </ChangePasswordWrapper>
  )
}

export default ChangePassword
