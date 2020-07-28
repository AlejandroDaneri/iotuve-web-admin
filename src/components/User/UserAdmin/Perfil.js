/* Import Libs */
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import Constants */
import { COLOR_PRIMARY } from '../../../constants'

/* Import WebApi */
import { getAdminUser, saveAdminUser } from '../../../webapi'

const Perfil = ({ username }) => {
  const [error, changeError] = useState(false)
  const [loading, changeLoading] = useState(true)
  const [success, changeSuccess] = useState(false)
  const [email, changeEmail] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()

  useEffect(() => {
    getAdminUser(username)
      .then(response => {
        const { data } = response
        const { email } = data
        changeFirstName(data.first_name)
        changeLastName(data.last_name)
        changeEmail(email)
        changeLoading(false)
      })
      .catch(_ => {})
  }, [username])

  function save () {
    saveAdminUser(username, {
      first_name: firstName,
      last_name: lastName,
      email: email
    })
      .then(() => {
        changeSuccess(true)
      })
      .catch(err => {
        err.response && err.response.status === 400 && changeError(true)
      })
  }

  return loading ? (
    <CircleLoader color={COLOR_PRIMARY} size={250} />
  ) : (
    <div className='perfil'>
      <div className='title'>
        <h3>Perfil</h3>
      </div>

      <div>
        <p />
        <>
          <div>Mail</div>
          <input value={email} onChange={e => changeEmail(e.target.value)} />
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
        <div onClick={() => save()}>
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
    </div>
  )
}

export default Perfil
