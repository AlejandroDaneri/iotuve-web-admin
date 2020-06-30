/* Import Libs */
import React, { useState } from 'react'
import qs from 'qs'

/* Import WebApi */
import { doRecoveryPassword } from '../webapi'

/* Import Styled Components */
import { ChangePasswordWrapper } from '../styles/ChangePasswordStyled'
import { Button } from '../styles/ButtonStyled'

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

      <form>
        <input id='username' value={username} readOnly />
        <input
          id='password'
          type='password'
          value={password}
          onChange={e => changePassword(e.target.value)}
          placeholder='Contraseña'
        />
        <input
          id='confirm-password'
          type='password'
          value={confirmPassword}
          onChange={e => changeConfirmPassword(e.target.value)}
          placeholder='Confirmar Contraseña'
        />
        <Button disabled={isDisabled} onClick={onSubmit}>
          Aceptar
        </Button>
      </form>
    </ChangePasswordWrapper>
  )
}

export default ChangePassword
