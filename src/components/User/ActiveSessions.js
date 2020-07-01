/* Import Libs */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

/* Import WebApi */
import { getUserSessions } from '../../webapi'

const ActiveSessions = ({ username }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    getUserSessions(username).then(response => {
      const { data } = response
      console.error(data)
    })
  }, [username, dispatch])

  return (
    <div className='active-sessions'>
      <h3>Sessiones Activas</h3>
    </div>
  )
}

export default ActiveSessions
