/* Import Libs */
import React from 'react'
import Button from '@material-ui/core/Button'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

const Perfil = ({
  loading,
  url,
  loginService,
  email,
  changeEmail,
  phone,
  changePhone,
  firstName,
  changeFirstName,
  lastName,
  changeLastName,
  save,
  success,
  changeSuccess
}) => {
  return loading ? (
    <CircleLoader color={COLOR_PRIMARY} size={250} />
  ) : (
    <div className='perfil'>
      <div className='title'>
        <h3>Perfil</h3>
      </div>

      <div className='row'>
        <div className='field'>
          Avatar
          <br />
          <a href={url}>
            <img alt='Avatar thumb' width='100px' height='100px' src={url} />
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
          <input value={email} onChange={e => changeEmail(e.target.value)} />
        </div>

        <div className='field'>
          Telefono
          <br />
          <input value={phone} onChange={e => changePhone(e.target.value)} />
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
    </div>
  )
}

export default Perfil
