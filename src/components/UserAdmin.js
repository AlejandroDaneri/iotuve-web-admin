/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import WebApi */
import { doChangeAdminPassword, getAdminUser, saveAdminUser } from '../webapi'

/* Import Styled Components */
import { UserWrapper } from '../styles/UserStyled'

/* Import StateApi */
import { getToken } from '../stateapi/auth'
import Button from '@material-ui/core/Button'

const UserAdmin = () => {
  const { username } = useParams()

  const [user, changeUser] = useState()

  const [email, changeEmail] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()

  const [success, changeSuccess] = useState(false)

  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')
  const [pwdSuccess, changePwdSuccess] = useState(false)

  const dispatch = useDispatch()
  const token = useSelector(getToken)

  useEffect(() => {
    getAdminUser(username)
      .then(response => {
        const { data } = response
        const { email } = data
        changeFirstName(data.first_name)
        changeLastName(data.last_name)
        changeEmail(email)
        changeUser(data)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: 'AUTH_LOGOUT'
          })
        }
      })
  }, [username, dispatch])

  function save () {
    saveAdminUser(username, {
      first_name: firstName,
      last_name: lastName,
      email: email
    })
      .then(_ => {
        changeSuccess(true)
      })
      .catch(_ => {})
  }
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
      {user ? (
        <>
          <div>
            <p />
            <>
              <div>Mail</div>
              <input
                value={email}
                onChange={e => changeEmail(e.target.value)}
              />
            </>
            <p />
            <>
              <div>Nombre</div>
              <input
                value={firstName}
                onChange={e => changeFirstName(e.target.value)}
              />
            </>
            <p />
            <>
              <div>Apellido</div>
              <input
                value={lastName}
                onChange={e => changeLastName(e.target.value)}
              />
            </>
            <p />
          </div>
          <div className='actions'>
            <div className='action'>
              <Button
                href='/users_admin'
                variant='contained'
                style={{ backgroundColor: '#61dafb' }}
              >
                Cancelar
              </Button>
            </div>
            <div className='action' onClick={() => save()}>
              <Button
                href='/users_admin'
                variant='contained'
                style={{ backgroundColor: '#61dafb' }}
              >
                Guardar
              </Button>
            </div>
          </div>

          <Snackbar
            open={success}
            onClose={() => changeSuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={6000}
          >
            <SnackbarContent
              message='Usuario editado con exito'
              style={{
                color: 'black',
                backgroundColor: '#61dafb',
                fontSize: '14px'
              }}
            />
          </Snackbar>

          {/* ---Password change section--- */}
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
                backgroundColor: '#61dafb',
                fontSize: '14px'
              }}
            />
          </Snackbar>
        </>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </UserWrapper>
  )
}

export default UserAdmin
