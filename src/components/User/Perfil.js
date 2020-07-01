/* Import Libs */
import React from 'react'
import Button from '@material-ui/core/Button'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

const Perfil = ({
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
  save
}) => {
  return (
    <div>
      <div>
        Avatar
        <br />
        <a href={url}>
          <img alt='Avatar thumb' width='100px' height='100px' src={url} />
        </a>
      </div>

      <p />

      <div>
        <div>Servicio de Login</div>
        {loginService ? 'Si' : 'No'}
      </div>

      <p />

      <div>
        Mail
        <br />
        <input value={email} onChange={e => changeEmail(e.target.value)} />
      </div>

      <p />

      <div>
        Telefono
        <br />
        <input value={phone} onChange={e => changePhone(e.target.value)} />
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
    </div>
  )
}

export default Perfil
