/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'

/* Import Styled Components */
import { UsersAdminWrapper } from '../styles/UsersAdminStyled'
import { StyledModal } from '../styles/ModalStyled'
import { ButtonEdit, ButtonDelete } from '../styles/ButtonsStyled'
import { StyledTableRow, StyledTableCell } from '../styles/TableStyled'

/* Import WebApi */
import { getUsersAdmin, removeAdminUser } from '../webapi'

/* Import Constants */
import { AUTH_LOGOUT } from '../constants'

const UserModal = ({ name, modalOpen, changeModalOpen, remove }) => {
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

const AdminUsers = () => {
  const [users, changeUsers] = useState()
  const [selected, changeSelected] = useState({})
  const [modalOpen, changeModalOpen] = useState(false)
  const [informOpen, changeInformOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getUsersAdmin()
      .then(response => {
        const { data } = response
        changeUsers(data)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: AUTH_LOGOUT
          })
        }
      })
  }, [dispatch])

  function parseTimestamp (timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }

  function remove () {
    removeAdminUser(selected.username)
      .then(response => {
        changeUsers(_.without(users, selected))
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
      <UserModal
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
            backgroundColor: '#61dafb',
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
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(users || []).map(user => {
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
        <CircleLoader color='#61dafb' size={250} />
      )}
    </UsersAdminWrapper>
  )
}

export default AdminUsers
