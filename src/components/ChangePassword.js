/* Import Libs */
import React, { useState } from 'react'
import qs from 'qs'

/* Import WebApi */
import { doRecoveryPassword } from '../webapi'

/* Import Styled Components */
import { ChangePasswordWrapper } from '../styles/ChangePasswordStyled'
import Button from '@material-ui/core/Button'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import { COLOR_PRIMARY } from '../constants'

const ChangePassword = location => {
  const { key, username } = qs.parse(location.location.search, {
    ignoreQueryPrefix: true
  })

  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')
  const [pwdSuccess, changePwdSuccess] = useState(false)

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
        changePwdSuccess(true)
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
        {isDisabled() ? (
          <Button
            variant='outlined'
            style={{ borderColor: COLOR_PRIMARY, color: 'white' }}
            disabled
          >
            Cambiar contraseña
          </Button>
        ) : (
          <Button
            variant='contained'
            style={{ backgroundColor: COLOR_PRIMARY, color: 'black' }}
            disabled={false}
            onClick={onSubmit}
          >
            Cambiar contraseña
          </Button>
        )}
      </form>
      <Snackbar
        open={pwdSuccess}
        onClose={() => changePwdSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message='Contraseña cambiada con éxito'
          style={{
            color: 'black',
            backgroundColor: COLOR_PRIMARY,
            fontSize: '14px'
          }}
        />
      </Snackbar>
    </ChangePasswordWrapper>
  )
}

export default ChangePassword
