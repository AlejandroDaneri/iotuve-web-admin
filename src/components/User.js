import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../stateapi/auth'
import { getUser } from '../webapi'
import { useParams } from 'react-router-dom'

import { UserWrapper } from '../styles/UserStyled'

const User = () => {
  const token = useSelector(getToken)
  const { username } = useParams()

  const [user, changeUser] = useState({ contact: {} })

  const dispatch = useDispatch()

  useEffect(() => {
    getUser(token, username)
      .then(response => {
        const { data } = response
        console.error(data)
        changeUser(data)
      })
      .catch(_ => {
        dispatch({
          type: 'AUTH_LOGOUT'
        })
      })
  }, [token, username, dispatch])

  return (
    <UserWrapper>
      <h2>Usuario</h2>
      <div>Usuario: {user.username}</div>
      <div>Mail: {user.contact.email}</div>
      <div>Telefono: {user.contact.phone}</div>
      <div>Nombre: {user.first_name}</div>
      <div>Apellido: {user.last_name}</div>
    </UserWrapper>
  )
}

export default User
