/* Import Libs */
import React from 'react'
import { useParams } from 'react-router-dom'

/* Import Components */
import Perfil from './Perfil'
import ChangePassword from './ChangePassword'
import ActiveSessions from './ActiveSessions'

/* Import Styled Components */
import { UserWrapper } from '../../styles/UserStyled'

const UserAdmin = () => {
  const { username } = useParams()

  return (
    <UserWrapper>
      <h2>Admin: {username}</h2>

      <div className='views'>
        <Perfil username={username} />
        <ChangePassword username={username} />
        <ActiveSessions username={username} />
      </div>
    </UserWrapper>
  )
}

export default UserAdmin
