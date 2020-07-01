/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import WebApi */
import { getUser, saveUser } from '../webapi'

/* Import Styled Components */
import { UserWrapper } from '../styles/UserStyled'

/* Import Constants */
import { AUTH_LOGOUT, COLOR_PRIMARY } from '../constants'
import Button from '@material-ui/core/Button'

const User = () => {
  const { username } = useParams()

  const [user, changeUser] = useState()

  const [email, changeEmail] = useState()
  const [phone, changePhone] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()
  const [loginService, changeLoginService] = useState(false)
  const [url, changeUrl] = useState()

  const [success, changeSuccess] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getUser(username)
      .then(response => {
        const { data } = response
        const { contact, avatar } = data
        const { email, phone } = contact
        const { url } = avatar
        changeUrl(url)
        changeUser(data)
        changeEmail(email)
        changePhone(phone)
        changeFirstName(data.first_name)
        changeLastName(data.last_name)
        changeLoginService(data.login_service)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: AUTH_LOGOUT
          })
        }
      })
  }, [username, dispatch])

  function save () {
    saveUser(username, {
      first_name: firstName,
      last_name: lastName,
      contact: {
        email: email,
        phone: phone
      }
    })
      .then(_ => {
        changeSuccess(true)
      })
      .catch(_ => {})
  }

  return (
    <UserWrapper>
      <h2>Usuario: {username}</h2>
      {user ? (
        <>
          <div>
            <div>
              Avatar
              <br />
              <a href={url}>
                <img
                  alt='Avatar thumb'
                  width='100px'
                  height='100px'
                  src={url}
                />
              </a>
            </div>
            <div>
              <div>Servicio de Login</div>
              {loginService ? 'Si' : 'No'}
            </div>
            <p />
            <div>
              Mail
              <br />
              <input
                value={email}
                onChange={e => changeEmail(e.target.value)}
              />
            </div>
            <p />
            <div>
              Telefono
              <br />
              <input
                value={phone}
                onChange={e => changePhone(e.target.value)}
              />
            </div>
            <p />
            <div>
              Nombre
              <br />
              <input
                value={firstName}
                onChange={e => changeFirstName(e.target.value)}
              />
            </div>
            <p />
            <div>
              Apellido
              <br />
              <input
                value={lastName}
                onChange={e => changeLastName(e.target.value)}
              />
            </div>
            <p />
          </div>
          <div className='actions'>
            <div className='action'>
              <Button
                href='/users'
                variant='contained'
                style={{ backgroundColor: COLOR_PRIMARY }}
              >
                Cancelar{' '}
              </Button>
            </div>
            <div className='action' onClick={() => save()}>
              <Button
                href='/users'
                variant='contained'
                style={{ backgroundColor: COLOR_PRIMARY }}
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
                backgroundColor: COLOR_PRIMARY,
                fontSize: '14px'
              }}
            />
          </Snackbar>
        </>
      ) : (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
    </UserWrapper>
  )
}

export default User
