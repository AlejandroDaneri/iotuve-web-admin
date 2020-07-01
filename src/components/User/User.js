/* Import Libs */
import React from 'react'

import { useParams } from 'react-router-dom'

/* Import Styled Components */
import { UserWrapper } from '../../styles/UserStyled'

/* Import Components */
import Perfil from './Perfil'
import ActiveSessions from './ActiveSessions'

const User = () => {
  const { username } = useParams()

  return (
    <UserWrapper>
      <h2>Usuario: {username}</h2>

      <Perfil username={username} />

      <ActiveSessions username={username} />
    </UserWrapper>
  )
}

export default User
