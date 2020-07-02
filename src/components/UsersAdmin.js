/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import BeatLoader from 'react-spinners/BeatLoader'
import { Link } from 'react-router-dom'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'

/* Import Components */
import Modal from '../components/Modal'

/* Import Styled Components */
import { UsersAdminWrapper } from '../styles/UsersAdminStyled'
import { ButtonEdit, ButtonDelete } from '../styles/ButtonsStyled'
import { StyledTableRow, StyledTableCell } from '../styles/TableStyled'
import Tooltip from '@material-ui/core/Tooltip'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

/* Import WebApi */
import { getUsersAdmin, getUserAdminSessions, removeAdminUser } from '../webapi'

/* Import Constants */
import { AUTH_LOGOUT, COLOR_PRIMARY } from '../constants'

const AdminUsers = () => {
  const [users, changeUsers] = useState()
  const [selected, changeSelected] = useState({})
  const [modalOpen, changeModalOpen] = useState(false)
  const [informOpen, changeInformOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const usersPromise = new Promise((resolve, reject) => {
      getUsersAdmin()
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
      console.error('Users Promise Ok')
      Object.keys(users).forEach(username => {
        console.error(username)
        getUserAdminSessions(username).then(response => {
          const { data } = response
          const activeState =
            data.length > 0 ? (
              <Tooltip title='Conectado'>
                <FiberManualRecordIcon style={{ color: 'green' }} />
              </Tooltip>
            ) : (
              <Tooltip title='Desconectado'>
                <FiberManualRecordIcon style={{ color: 'red' }} />
              </Tooltip>
            )
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
    removeAdminUser(selected.username)
      .then(response => {
        const key = selected.username
        const { [key]: value, ...withoutSecond } = users
        changeUsers(withoutSecond)
        changeModalOpen(false)
        changeInformOpen(true)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: AUTH_LOGOUT
          })
        }
      })
  }

  return (
    <UsersAdminWrapper>
      <Modal
        resource='usuario'
        remove={remove}
        name={selected.username}
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
            backgroundColor: COLOR_PRIMARY,
            fontSize: '14px'
          }}
        />
      </Snackbar>
      <h2>Usuarios Admin</h2>
      {users ? (
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Usuario</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
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
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>
                    {parseTimestamp(user.date_created)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {user.activeState || <BeatLoader color={COLOR_PRIMARY} />}
                  </StyledTableCell>
                  <StyledTableCell className='actions'>
                    <Link to={`/user_admin/${user.username}`}>
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
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
    </UsersAdminWrapper>
  )
}

export default AdminUsers
