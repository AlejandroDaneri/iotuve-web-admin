/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

/* Import WebApi */
import { getUserSessions } from '../../webapi'

/* Import Styled Components */
import { UserWrapper } from '../../styles/UserStyled'

/* Import Components */
import Perfil from './Perfil'
import ActiveSessions from './ActiveSessions'

const User = () => {
  const { username } = useParams()

  const [success, changeSuccess] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getUserSessions(username).then(response => {
      const { data } = response
      console.error(data)
    })
  }, [username, dispatch])

  return (
    <UserWrapper>
      <h2>Usuario: {username}</h2>

      <Perfil
        username={username}
        success={success}
        changeSuccess={changeSuccess}
      />

      <ActiveSessions />
    </UserWrapper>
  )
}

export default User
