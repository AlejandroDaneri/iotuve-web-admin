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
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'

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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#343944'
    },
    '&:hover': {
      backgroundColor: '#414855'
    }
  }
}))(TableRow)

const DeleteModal = ({ modalOpen, changeModalOpen, remove }) => {
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
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: 'AUTH_LOGOUT'
          })
        }
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
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Usuario</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Teléfono</StyledTableCell>
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
                  <StyledTableCell>{user.contact.email}</StyledTableCell>
                  <StyledTableCell>{user.contact.phone}</StyledTableCell>
                  <StyledTableCell>
                    {parseTimestamp(user.date_created)}
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
