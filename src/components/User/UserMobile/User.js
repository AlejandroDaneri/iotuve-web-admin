/* Import Libs */
import React from 'react'
import { useParams } from 'react-router-dom'

/* Import Styled Components */
import { UserWrapper } from '../../../styles/UserStyled'

/* Import Components */
import Perfil from './Perfil'
import ActiveSessions from './ActiveSessions'
import ChangePassword from '../ChangePassword'

/* Import WebApi */
import { doChangeUserPassword } from '../../../webapi'

const User = () => {
  const { username } = useParams()

  return (
    <UserWrapper>
      <h2>Usuario: {username}</h2>

      <div className='views'>
        <Perfil username={username} />
        <ChangePassword
          doChangePassword={doChangeUserPassword}
          username={username}
        />
        <ActiveSessions username={username} />
      </div>
    </UserWrapper>
  )
}

export default User
