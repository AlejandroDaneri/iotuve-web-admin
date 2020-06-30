/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import BeatLoader from 'react-spinners/BeatLoader'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Modal from 'styled-react-modal'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'

/* Import WebApi */
import { getUsers, getUserSessions, removeUser } from '../webapi'

/* Import Styled Components */
import { UsersWrapper } from '../styles/UsersStyled'
import { StyledTableRow } from '../styles/TableStyled'

const IS_ACTIVE_LOADING = 'IS_ACTIVE_LOADING'
const IS_ACTIVE_YES = 'IS_ACTIVE_YES'
const IS_ACTIVE_NO = 'IS_ACTIVE_NO'

const IS_ACTIVE = {
  [IS_ACTIVE_LOADING]: <BeatLoader color='#61dafb' />,
  [IS_ACTIVE_YES]: 'Si',
  [IS_ACTIVE_NO]: 'No'
}

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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    color: '#61dafb'
  }
}))(TableCell)

const DeleteModal = ({ name, modalOpen, changeModalOpen, remove }) => {
  return (
    <StyledModal
      isOpen={modalOpen}
      onBackgroundClick={null}
      onEscapeKeydown={null}
    >
      <span>Esta seguro que desea borrar el usuario {name}?</span>
      <div className='actions'>
        <button onClick={() => changeModalOpen(false)}>Cancelar</button>
        <button onClick={remove}>Aceptar</button>
      </div>
    </StyledModal>
  )
}

const Users = () => {
  const [users, changeUsers] = useState({})
  const [selected, changeSelected] = useState({})
  const [modalOpen, changeModalOpen] = useState(false)
  const [informOpen, changeInformOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const usersPromise = new Promise((resolve, reject) => {
      getUsers()
        .then(response => {
          const { data } = response
          const u = {}
          data.forEach(user => {
            u[user.username] = {
              ...user,
              activeState: IS_ACTIVE_LOADING
            }
          })
          changeUsers(u)
          resolve(u)
        })
        .catch(err => {
          console.error(err)
          if (err.response !== 500) {
            dispatch({
              type: 'AUTH_LOGOUT'
            })
          }
          reject(err)
        })
    })

    usersPromise.then(async users => {
      let currentUsers = {
        ...users
      }
      await Object.keys(users).forEach(async username => {
        await getUserSessions(username).then(response => {
          const { data } = response
          const activeState = data.length > 0 ? IS_ACTIVE_YES : IS_ACTIVE_NO
          currentUsers = {
            ...currentUsers,
            [username]: {
              ...currentUsers[username],
              activeState
            }
          }
          changeUsers(currentUsers)
        })
      })
      changeUsers(currentUsers)
    })
  }, [dispatch])

  function parseTimestamp (timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }

  function remove () {
    removeUser(selected.username)
      .then(response => {
        changeUsers(_.without(users, selected))
        changeModalOpen(false)
        changeInformOpen(true)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: 'AUTH_LOGOUT'
          })
        }
      })
  }

  return (
    <UsersWrapper>
      <DeleteModal
        name={selected.username}
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
      {Object.keys(users).length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Usuario</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Teléfono</StyledTableCell>
              <StyledTableCell>Fecha de creación</StyledTableCell>
              <StyledTableCell>Online</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(Object.values(users) || []).map(user => {
              return (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>{user.username}</StyledTableCell>
                  <StyledTableCell>
                    {user.first_name} {user.last_name}
                  </StyledTableCell>
                  <StyledTableCell>{user.contact.email}</StyledTableCell>
                  <StyledTableCell>{user.contact.phone}</StyledTableCell>
                  <StyledTableCell>
                    {parseTimestamp(user.date_created)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {IS_ACTIVE[user.activeState]}
                  </StyledTableCell>
                  <StyledTableCell className='actions'>
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
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </UsersWrapper>
  )
}

export default Users
