import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, removeUser } from '../webapi'
import { getToken } from '../stateapi/auth'
import { UsersWrapper } from '../styles/UsersStyled'
import CircleLoader from 'react-spinners/CircleLoader'
import _ from 'lodash'

const Users = () => {
  const token = useSelector(getToken)
  const [users, changeUsers] = useState()

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

  function remove (user) {
    removeUser(token, user.username)
      .then(response => {
        changeUsers(_.without(users, user))
      })
      .catch(_ => {
        dispatch({
          type: 'AUTH_LOGOUT'
        })
      })
  }

  return (
    <UsersWrapper>
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
                  <td>
                    <div className='delete' onClick={() => remove(user)}>
                      X
                    </div>
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
