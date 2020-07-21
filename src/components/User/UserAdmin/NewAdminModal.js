import { createAdminUser } from '../../../webapi'
import { Button, Snackbar, SnackbarContent } from '@material-ui/core'
import { COLOR_ERROR, COLOR_PRIMARY } from '../../../constants'
import { StyledModal } from '../../../styles/ModalStyled'
import React, { useState } from 'react'
import { getToken } from '../../../stateapi/auth'
import { useSelector } from 'react-redux'

const NewAdminModal = ({ modalOpen, changeModalOpen }) => {
  const token = useSelector(getToken)
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const [rePwd, setRePwd] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [infoOpen, setInfoOpen] = useState(false)
  const [error, setError] = useState(false)

  function isDisabled () {
    return !(
      username &&
      email &&
      firstName &&
      lastName &&
      pwd &&
      rePwd &&
      pwd === rePwd
    )
  }

  function createAdmin () {
    createAdminUser(token, {
      username: username,
      password: pwd,
      first_name: firstName,
      last_name: lastName,
      email: email
    })
      .then(r => {
        setError(false)
        setInfoOpen(true)
      })
      .catch(e => {
        setError(true)
        setInfoOpen(true)
      })
  }

  return (
    <>
      <Snackbar
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message={error ? 'Error al crear el admin' : 'Admin creado con éxito'}
          style={{
            color: 'black',
            backgroundColor: error ? COLOR_ERROR : COLOR_PRIMARY,
            fontSize: '14px'
          }}
        />
      </Snackbar>
      <StyledModal
        style={{ height: '35%' }}
        isOpen={modalOpen}
        onBackgroundClick={() => changeModalOpen(false)}
        onEscapeKeydown={null}
      >
        <span>Ingrese los datos del nuevo admin</span>
        <input
          style={{ padding: '2px', margin: '2px' }}
          placeholder='Nombres'
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          style={{ padding: '2px', margin: '2px' }}
          placeholder='Apellidos'
          onChange={e => setLastName(e.target.value)}
        />
        <input
          style={{ padding: '2px', margin: '2px' }}
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={{ padding: '2px', margin: '2px' }}
          placeholder='Nombre de usuario'
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          style={{ padding: '2px', margin: '2px' }}
          placeholder='Contraseña'
          onChange={e => setPwd(e.target.value)}
        />
        <input
          type='password'
          style={{ padding: '2px', margin: '2px' }}
          placeholder='Reingrese contraseña'
          onChange={e => setRePwd(e.target.value)}
        />

        <div className='actions'>
          <Button
            variant='contained'
            style={{ backgroundColor: COLOR_PRIMARY }}
            onClick={() => changeModalOpen(false)}
          >
            Cancelar
          </Button>

          {isDisabled() ? (
            <Button
              variant='outlined'
              style={{ borderColor: COLOR_PRIMARY, color: 'white' }}
              disabled
            >
              Aceptar
            </Button>
          ) : (
            <Button
              variant='contained'
              style={{ backgroundColor: COLOR_PRIMARY }}
              onClick={() => {
                createAdmin()
                changeModalOpen(false)
              }}
            >
              Aceptar
            </Button>
          )}
        </div>
      </StyledModal>
    </>
  )
}
export default NewAdminModal
