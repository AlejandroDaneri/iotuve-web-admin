import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { getUser, saveUser } from '../webapi'
import { useParams } from 'react-router-dom'
import CircleLoader from 'react-spinners/CircleLoader'
import { UserWrapper } from '../styles/UserStyled'
import { Snackbar, SnackbarContent } from '@material-ui/core'

const User = () => {
  const token = useSelector(getToken)
  const { username } = useParams()

  const [user, changeUser] = useState()
  const [edit, changeEdit] = useState(false)

  const [Username, changeUsername] = useState()
  const [email, changeEmail] = useState()
  const [phone, changePhone] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()
  const [loginService, changeLoginService] = useState(false)
  const [url, changeUrl] = useState()

  const [success, changeSuccess] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getUser(token, username)
      .then(response => {
        console.log(response)
        const { data } = response
        const { username, contact, avatar } = data
        const { email, phone } = contact
        const { url } = avatar
        changeUrl(url)
        changeUser(data)
        changeUsername(username)
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
            type: 'AUTH_LOGOUT'
          })
        }
      })
  }, [token, username, dispatch])

  function save () {
    saveUser(token, username, {
      first_name: firstName,
      last_name: lastName,
      contact: {
        email: email,
        phone: phone
      }
    })
      .then(_ => {
        changeSuccess(true)
        changeEdit(false)
      })
      .catch(_ => {
        changeEdit(false)
      })
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
              {edit ? (
                <input
                  value={email}
                  onChange={e => changeEmail(e.target.value)}
                />
              ) : (
                email
              )}
            </div>
            <div>
              Telefono:{' '}
              {edit ? (
                <input
                  value={phone}
                  onChange={e => changePhone(e.target.value)}
                />
              ) : (
                phone
              )}
            </div>
            <div>
              Nombre:{' '}
              {edit ? (
                <input
                  value={firstName}
                  onChange={e => changeFirstName(e.target.value)}
                />
              ) : (
                firstName
              )}
            </div>
            <div>
              Apellido:{' '}
              {edit ? (
                <input
                  value={lastName}
                  onChange={e => changeLastName(e.target.value)}
                />
              ) : (
                lastName
              )}
            </div>
            <div>Servicio de Login: {loginService ? 'Si' : 'No'}</div>
            <div>
              Avatar:{' '}
              <a href={url}>
                <img alt='Avatar thumb' width='80px' height='40px' src={url} />
              </a>
            </div>
          </div>
          <div className='actions'>
            <div className='action' onClick={() => changeEdit(!edit)}>
              {edit ? 'Cancelar' : 'Editar'}
            </div>
            {edit && (
              <div className='action' onClick={() => save()}>
                Guardar
              </div>
            )}
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
        </>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </UserWrapper>
  )
}

export default User
