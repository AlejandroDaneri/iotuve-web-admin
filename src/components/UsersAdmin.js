import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { getUsersAdmin } from '../webapi'

const AdminUsers = () => {
  const token = useSelector(getToken)
  const [users, changeUsers] = useState()

  useEffect(() => {
    getUsersAdmin(token)
      .then(response => {
        const { data } = response
        changeUsers(data)
      })
      .catch(_ => {
        console.error('Users Admin Get Error')
      })
  }, [token])

  function parseTimestamp (timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }

  return (
    <div>
      <h2>Usuarios Admin</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
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
    </div>
  )
}

export default AdminUsers
