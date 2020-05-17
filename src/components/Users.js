import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUsers } from '../webapi'
import { getToken } from '../stateapi/auth'
import { UsersWrapper } from '../styles/UsersStyled'
import CircleLoader from 'react-spinners/CircleLoader'

const Users = () => {
  const token = useSelector(getToken)
  const [users, changeUsers] = useState()

  useEffect(() => {
    getUsers(token)
      .then(response => {
        const { data } = response
        changeUsers(data)
      })
      .catch(_ => {
        console.error('Users Get Error')
      })
  }, [token])

  return (
    <UsersWrapper>
      <h2>Usuarios</h2>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
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
