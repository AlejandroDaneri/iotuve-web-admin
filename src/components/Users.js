/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import BeatLoader from 'react-spinners/BeatLoader'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

/* Import WebApi */
import { getUsers, getUserSessions, removeUser } from '../webapi'

/* Import Components */
import DeleteModal from './Modal'

/* Import Constants */
import { AUTH_LOGOUT } from '../constants'

/* Import Styled Components */
import { UsersWrapper } from '../styles/UsersStyled'
import { StyledTableRow, StyledTableCell } from '../styles/TableStyled'
import { ButtonEdit, ButtonDelete } from '../styles/ButtonsStyled'

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
            u[user.username] = user
          })
          changeUsers(u)
          resolve(u)
        })
        .catch(err => {
          console.error(err)
          if (err.response !== 500) {
            dispatch({
              type: AUTH_LOGOUT
            })
          }
          reject(err)
        })
    })

    usersPromise.then(users => {
      Object.keys(users).forEach(username => {
        getUserSessions(username).then(response => {
          const { data } = response
          const activeState = data.length > 0 ? 'Yes' : 'No'
          users = {
            ...users,
            [username]: {
              ...users[username],
              activeState
            }
          }
          changeUsers(users)
        })
      })
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
        resource='usuario'
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
                    {user.activeState || <BeatLoader color='#61dafb' />}
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
