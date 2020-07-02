/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

const ActiveSessions = ({ username, getSessions }) => {
  const dispatch = useDispatch()
  const [loading, changeLoading] = useState(true)
  const [sessions, changeSessions] = useState([])

  useEffect(() => {
    getSessions(username).then(response => {
      const { data } = response
      changeSessions(data)
      changeLoading(false)
    })
  }, [username, dispatch, getSessions])

  return (
    <div className='active-sessions'>
      <div className='title'>
        <h3>Sessiones Activas</h3>
      </div>
      {loading ? (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      ) : (
        <>
          {sessions.map((session, index) => {
            return (
              <div key={index}>
                <div>Creada: {session.date_created}</div>
                <div>Expira: {session.expires}</div>
                <p />
              </div>
            )
          })}
          {sessions.length === 0 && 'No hay'}
        </>
      )}
    </div>
  )
}

export default ActiveSessions
