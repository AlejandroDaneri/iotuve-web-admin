/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'

/* Import WebApi */
import { doChangeAdminPassword, getUserAdminSessions } from '../../webapi'

/* Import Components */
import Perfil from './Perfil'

/* Import Styled Components */
import { UserWrapper } from '../../styles/UserStyled'

/* Import StateApi */
import { getToken } from '../../stateapi/auth'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

const UserAdmin = () => {
  const { username } = useParams()

  const [sessions, changeSessions] = useState()

  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')
  const [pwdSuccess, changePwdSuccess] = useState(false)

  const dispatch = useDispatch()
  const token = useSelector(getToken)

  useEffect(() => {
    getUserAdminSessions(username).then(response => {
      const { data } = response
      changeSessions(data)
    })
  }, [username, dispatch])

  function onSubmit (e) {
    e.preventDefault()
    doChangeAdminPassword(token, username, password)
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
    <UserWrapper>
      <h2>Admin: {username}</h2>

      <Perfil username={username} />

      <h2>Cambiar Contraseña</h2>
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

      <div>
        {isDisabled() ? (
          <Button
            variant='outlined'
            style={{ borderColor: 'red', color: 'white' }}
            disabled
          >
            Cambiar contraseña
          </Button>
        ) : (
          <Button
            variant='contained'
            style={{ backgroundColor: 'red', color: 'white' }}
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

      <h2>Sessiones Activas</h2>
      {sessions
        ? sessions.map((session, index) => {
            return (
              <div key={index}>
                <div>Creada: {session.date_created}</div>
                <div>Expira: {session.expires}</div>
              </div>
            )
          })
        : 'Loading Sessions'}
    </UserWrapper>
  )
}

export default UserAdmin
