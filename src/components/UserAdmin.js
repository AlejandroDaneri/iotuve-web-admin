import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { doChangeAdminPassword, getAdminUser, saveAdminUser } from '../webapi'
import { useParams } from 'react-router-dom'
import CircleLoader from 'react-spinners/CircleLoader'
import { UserWrapper } from '../styles/UserStyled'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const UserAdmin = () => {
  const token = useSelector(getToken)
  const { username } = useParams()

  const [user, changeUser] = useState()

  const [Username, changeUsername] = useState()
  const [email, changeEmail] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()

  const [success, changeSuccess] = useState(false)

  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')
  const [pwdSuccess, changePwdSuccess] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getAdminUser(token, username)
      .then(response => {
        const { data } = response
        const { username, email } = data
        changeUsername(username)
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
  }, [token, username, dispatch])

  function save () {
    saveAdminUser(token, username, {
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
      <h2>Usuario</h2>
      {user ? (
        <>
          <div>
            <div>Usuario: {Username}</div>
            <div>
              Mail:{' '}
              <input
                value={email}
                onChange={e => changeEmail(e.target.value)}
              />
            </div>
            <div>
              Nombre:{' '}
              <input
                value={firstName}
                onChange={e => changeFirstName(e.target.value)}
              />
            </div>
            <div>
              Apellido:{' '}
              <input
                value={lastName}
                onChange={e => changeLastName(e.target.value)}
              />
            </div>
          </div>
          <div className='actions'>
            <div className='action'>
              <Button href='/users_admin'>Cancelar</Button>
            </div>
            <div className='action' onClick={() => save()}>
              <Button href='/users_admin'>Guardar</Button>
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

          <form noValidate autoComplete='off'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 10
              }}
            >
              <input
                id='new_pwd'
                placeholder='Nueva contraseña'
                onChange={e => changePassword(e.target.value)}
              />
              <input
                id='chk_pwd'
                placeholder='Reingrese contraseña'
                onChange={e => changeConfirmPassword(e.target.value)}
              />
            </div>
          </form>

          <div className='actions'>
            {isDisabled() ? (
              <Button
                variant='outlined'
                style={{ borderColor: 'red', color: 'white' }}
                disabled='true'
              >
                Cambiar contraseña
              </Button>
            ) : (
              <Button
                variant='contained'
                style={{ backgroundColor: 'red', color: 'white' }}
                disabled='false'
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
