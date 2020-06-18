import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { getAdminUser, saveAdminUser } from '../webapi'
import { useParams } from 'react-router-dom'
import CircleLoader from 'react-spinners/CircleLoader'
import { UserWrapper } from '../styles/UserStyled'
import { Snackbar, SnackbarContent } from '@material-ui/core'

const UserAdmin = () => {
  const token = useSelector(getToken)
  const { username } = useParams()

  const [user, changeUser] = useState()
  const [edit, changeEdit] = useState(false)

  const [Username, changeUsername] = useState()
  const [email, changeEmail] = useState()
  const [firstName, changeFirstName] = useState()
  const [lastName, changeLastName] = useState()

  const [success, changeSuccess] = useState(false)

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

export default UserAdmin
