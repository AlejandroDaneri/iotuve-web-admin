import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, removeUser } from '../webapi'
import { getToken } from '../stateapi/auth'
import { UsersWrapper } from '../styles/UsersStyled'
import CircleLoader from 'react-spinners/CircleLoader'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Modal from 'styled-react-modal'
import { Snackbar, SnackbarContent } from '@material-ui/core'

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 10%;
  align-items: center;
  justify-content: center;
  background-color: #282c34;
  color: #61dafb;

  & .actions {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 1%;

    > button {
      margin: 1%;
    }
  }
`

const ButtonDelete = styled.span`
  color: red;
`

const ButtonEdit = styled.span`
  color: brown;
`

const UserModal = ({ modalOpen, changeModalOpen, remove }) => {
  return (
    <StyledModal
      isOpen={modalOpen}
      onBackgroundClick={null}
      onEscapeKeydown={null}
    >
      <span>Esta seguro que desea borrar el Usuario?</span>
      <div className='actions'>
        <button onClick={() => changeModalOpen(false)}>Cancelar</button>
        <button onClick={remove}>Aceptar</button>
      </div>
    </StyledModal>
  )
}

const Users = () => {
  const token = useSelector(getToken)
  const [users, changeUsers] = useState()
  const [selected, changeSelected] = useState()
  const [modalOpen, changeModalOpen] = useState(false)
  const [informOpen, changeInformOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getUsers(token)
      .then(response => {
        const { data } = response
        changeUsers(data)
      })
      .catch(_ => {
        dispatch({
          type: 'AUTH_LOGOUT'
        })
      })
  }, [token, dispatch])

  function parseTimestamp (timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }

  function remove () {
    removeUser(token, selected.username)
      .then(response => {
        changeUsers(_.without(users, selected))
        changeModalOpen(false)
        changeInformOpen(true)
      })
      .catch(_ => {
        dispatch({
          type: 'AUTH_LOGOUT'
        })
      })
  }

  return (
    <UsersWrapper>
      <UserModal
        remove={remove}
        modalOpen={modalOpen}
        changeModalOpen={changeModalOpen}
      />
      <Snackbar
        open={informOpen}
        onClose={() => changeInformOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message='Usuario borrado con exito'
          style={{
            color: 'black',
            backgroundColor: '#61dafb',
            fontSize: '14px'
          }}
        />
      </Snackbar>
      <h2>Usuarios</h2>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Fecha de Creacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(users || []).map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.contact.email}</td>
                  <td>{user.contact.phone}</td>
                  <td>{parseTimestamp(user.date_created)}</td>
                  <td className='actions'>
                    <Link to={`/user/${user.username}`}>
                      <ButtonEdit className='material-icons'>edit</ButtonEdit>
                    </Link>
                    <ButtonDelete
                      onClick={() => {
                        changeSelected(user)
                        changeModalOpen(true)
                      }}
                      className='material-icons'
                    >
                      delete_forever
                    </ButtonDelete>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </UsersWrapper>
  )
}

export default Users
