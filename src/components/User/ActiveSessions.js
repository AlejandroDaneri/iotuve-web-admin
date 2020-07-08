/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import _ from 'lodash'

/* Import Constants */
import { COLOR_PRIMARY } from '../../constants'

/* Import WebApi */
import { closeUserSession } from '../../webapi'

/* Import Styled Components */
import { ButtonDelete } from '../../styles/ButtonsStyled'

const ActiveSessions = ({ username, getSessions }) => {
  const dispatch = useDispatch()
  const [loading, changeLoading] = useState(true)
  const [sessions, changeSessions] = useState([])
  const [informOpen, changeInformOpen] = useState(false)

  useEffect(() => {
    getSessions(username).then(response => {
      const { data } = response
      changeSessions(data)
      changeLoading(false)
    })
  }, [username, dispatch, getSessions])

  function closeSession (session) {
    closeUserSession(session.id).then(response => {
      changeInformOpen(true)
      changeSessions(_.without(sessions, session))
    })
  }

  return (
    <div className='active-sessions'>
      <Snackbar
        open={informOpen}
        onClose={() => changeInformOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message='Session borrada con exito'
          style={{
            color: 'black',
            backgroundColor: COLOR_PRIMARY,
            fontSize: '14px'
          }}
        />
      </Snackbar>
      <div className='title'>
        <h3>Sessiones Activas</h3>
      </div>
      {loading ? (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      ) : (
        <>
          {sessions.map((session, index) => {
            return (
              <div className='session' key={index}>
                <div className='data'>
                  <div>
                    <b>Creada</b>: {session.date_created}
                  </div>
                  <div>
                    <b>Expira</b>: {session.expires}
                  </div>
                </div>
                <div className='delete'>
                  <ButtonDelete
                    className='material-icons'
                    onClick={() => closeSession(session)}
                  >
                    delete_forever
                  </ButtonDelete>
                </div>
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
