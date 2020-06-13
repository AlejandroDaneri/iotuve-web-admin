import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { UsersAdminWrapper } from '../styles/UsersAdminStyled'
import { getUsersAdmin } from '../webapi'
import CircleLoader from 'react-spinners/CircleLoader'

const AdminUsers = () => {
  const token = useSelector(getToken)
  const [users, changeUsers] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    getUsersAdmin(token)
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

  return (
    <UsersAdminWrapper>
      <h2>Usuarios Admin</h2>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Creacion</th>
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
                  <td>{user.email}</td>
                  <td>{parseTimestamp(user.date_created)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </UsersAdminWrapper>
  )
}

export default AdminUsers
