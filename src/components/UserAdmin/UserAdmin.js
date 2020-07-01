/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

/* Import WebApi */
import { getUserAdminSessions } from '../../webapi'

/* Import Components */
import Perfil from './Perfil'
import ChangePassword from './ChangePassword'

/* Import Styled Components */
import { UserWrapper } from '../../styles/UserStyled'

const UserAdmin = () => {
  const dispatch = useDispatch()
  const { username } = useParams()
  const [sessions, changeSessions] = useState()

  useEffect(() => {
    getUserAdminSessions(username).then(response => {
      const { data } = response
      changeSessions(data)
    })
  }, [username, dispatch])

  return (
    <UserWrapper>
      <h2>Admin: {username}</h2>

      <div className='views'>
        <Perfil username={username} />

        <ChangePassword username={username} />
      </div>
      <h2>Sessiones Activas</h2>
      {sessions
        ? sessions.map((session, index) => {
            return (
              <div key={index}>
                <div>Creada: {session.date_created}</div>
                <div>Expira: {session.expires}</div>
              </div>
            )
          })
        : 'Loading Sessions'}
    </UserWrapper>
  )
}

export default UserAdmin
