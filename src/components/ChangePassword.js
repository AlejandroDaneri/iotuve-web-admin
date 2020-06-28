/* Import Libs */
import React, { useState } from 'react'
import qs from 'qs'

/* Import WebApi */
import { doRecoveryPassword } from '../webapi'

/* Import Styled Components */
import { ChangePasswordWrapper } from '../styles/ChangePasswordStyled'

const ChangePassword = location => {
  const { key, username } = qs.parse(location.location.search, {
    ignoreQueryPrefix: true
  })

  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')

  function isDisabled () {
    if (!password) return true
    if (!confirmPassword) return true
    if (password !== confirmPassword) return true
    return false
  }

  function onSubmit (e) {
    e.preventDefault()
    doRecoveryPassword(key, username, password)
      .then(_ => {
        console.error('Change Password Success')
      })
      .catch(_ => {
        console.error('Change Password Error')
      })
  }

  return (
    <ChangePasswordWrapper>
      <h2>Cambiar Contraseña</h2>

      <form onSubmit={onSubmit} valid={!isDisabled()}>
        <input name='username' value={username} disabled />
        <input
          name='password'
          type='password'
          value={password}
          onChange={e => changePassword(e.target.value)}
          placeholder='Contraseña'
        />
        <input
          name='confirm-password'
          type='password'
          value={confirmPassword}
          onChange={e => changeConfirmPassword(e.target.value)}
          placeholder='Confirmar Contraseña'
        />
        <input
          className='submit'
          type='submit'
          disabled={isDisabled()}
          value='Enviar'
        />
      </form>
    </ChangePasswordWrapper>
  )
}

export default ChangePassword
