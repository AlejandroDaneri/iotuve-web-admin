/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import WebApi */
import { getUser, saveUser, getUserSessions } from '../../webapi'

/* Import Styled Components */
import { UserWrapper } from '../../styles/UserStyled'

/* Import Components */
import Perfil from './Perfil'

/* Import Constants */
import { AUTH_LOGOUT, COLOR_PRIMARY } from '../../constants'

const User = () => {
  const { username } = useParams()

  const [loading, changeLoading] = useState(true)
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
        changeEmail(email)
        changePhone(phone)
        changeFirstName(data.first_name)
        changeLastName(data.last_name)
        changeLoginService(data.login_service)
        changeLoading(false)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: AUTH_LOGOUT
          })
        }
      })

    getUserSessions(username).then(response => {
      const { data } = response
      console.error(data)
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

      <Perfil
        loading={loading}
        url={url}
        loginService={loginService}
        email={email}
        changeEmail={changeEmail}
        phone={phone}
        changePhone={changePhone}
        firstName={firstName}
        changeFirstName={changeFirstName}
        lastName={lastName}
        changeLastName={changeLastName}
        save={save}
      />

      {loading ? (
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
      ) : (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
      <h3>Sessiones Activas</h3>
    </UserWrapper>
  )
}

export default User
