/* Import Libs */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import StateApi */
import { getToken } from '../../stateapi/auth'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

const ChangePassword = ({ username, doChangePassword }) => {
  const token = useSelector(getToken)
  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')
  const [pwdSuccess, changePwdSuccess] = useState(false)

  function onSubmit (e) {
    e.preventDefault()
    doChangePassword(token, username, password)
      .then(_ => {
        console.log('Change Password Success')
        changePwdSuccess(true)
        document.getElementById('new_pwd').value = ''
        document.getElementById('chk_pwd').value = ''
        changePassword('')
        changeConfirmPassword('')
      })
      .catch(_ => {
        console.error('Change Password Error')
      })
  }

  function isDisabled () {
    if (!username) return true
    if (!password) return true
    if (!confirmPassword) return true
    if (password !== confirmPassword) return true
    return false
  }

  return (
    <div className='change-password'>
      <div className='title'>
        <h3>Cambiar Contraseña</h3>
      </div>

      <form autoComplete='off'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px'
          }}
        >
          <div>Nueva Contraseña</div>
          <input
            id='new_pwd'
            type='password'
            onChange={e => changePassword(e.target.value)}
          />

          <p />

          <div>Repita Nueva Contraseña</div>
          <input
            id='chk_pwd'
            type='password'
            onChange={e => changeConfirmPassword(e.target.value)}
          />
        </div>
      </form>

      <div className='submit-button'>
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
      </div>

      <Snackbar
        open={pwdSuccess}
        onClose={() => changePwdSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message='Contraseña cambiada con exito'
          style={{
            color: 'black',
            backgroundColor: COLOR_PRIMARY,
            fontSize: '14px'
          }}
        />
      </Snackbar>
    </div>
  )
}

export default ChangePassword
