import React, { useState } from 'react'
import qs from 'qs'
import { doChangePassword } from '../webapi'

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
    <div>
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={onSubmit}>
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
      </form>
    </div>
  )
}

export default ChangePassword
