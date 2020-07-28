/* Import Libs */
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import WebApi */
import { getUser, saveUser } from '../../../webapi'

/* Import Constants */
import { COLOR_PRIMARY } from '../../../constants'

const Perfil = ({ username }) => {
  const [error, changeError] = useState(false)
  const [loading, changeLoading] = useState(true)
  const [email, changeEmail] = useState()
  const [phone, changePhone] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()
  const [loginService, changeLoginService] = useState(false)
  const [url, changeUrl] = useState()
  const [success, changeSuccess] = useState(false)

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
      .catch(_ => {})
  }, [username])

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
      .catch(err => {
        err.response && err.response.status === 400 && changeError(true)
      })
  }

  return (
    <div className='perfil'>
      <div className='title'>
        <h3>Perfil</h3>
      </div>

      {loading ? (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      ) : (
        <>
          <div className='row'>
            <div className='field'>
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

            <div className='field'>
              <div>Servicio de Login</div>
              {loginService ? 'Si' : 'No'}
            </div>
          </div>

          <p />

          <div className='row'>
            <div className='field'>
              Mail
              <br />
              <input
                value={email}
                onChange={e => changeEmail(e.target.value)}
              />
            </div>

            <div className='field'>
              Telefono
              <br />
              <input
                value={phone}
                onChange={e => changePhone(e.target.value)}
              />
            </div>
          </div>

          <p />

          <div className='row'>
            <div className='field'>
              Nombre
              <br />
              <input
                value={firstName}
                onChange={e => changeFirstName(e.target.value)}
              />
            </div>

            <div className='field'>
              Apellido
              <br />
              <input
                value={lastName}
                onChange={e => changeLastName(e.target.value)}
              />
            </div>
          </div>

          <p />

          <div className='actions'>
            <div className='action' onClick={() => save()}>
              <Button
                variant='contained'
                style={{ backgroundColor: COLOR_PRIMARY }}
              >
                Guardar
              </Button>
            </div>
          </div>

          <Snackbar
            open={error}
            onClose={() => changeError(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={6000}
          >
            <SnackbarContent
              message='Perfil no editado'
              style={{
                color: 'black',
                backgroundColor: 'red',
                fontSize: '14px'
              }}
            />
          </Snackbar>

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
      )}
    </div>
  )
}

export default Perfil
