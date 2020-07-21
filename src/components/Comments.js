import React, { useEffect, useState } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import { AUTH_LOGOUT, COLOR_PRIMARY } from '../constants'
import { getComments } from '../webapi'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CommentsWrapper } from '../styles/CommentsStyled'

const Comments = () => {
  const { video_id: videoID } = useParams()
  const [comments, setComments] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(videoID)
    getComments(videoID)
      .then(response => {
        const { data } = response
        setComments(data.data)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: AUTH_LOGOUT
          })
        }
      })
  }, [dispatch, videoID])

  function parseTimestamp (timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }

  return (
    <CommentsWrapper>
      <h2>Comentarios</h2>
      {comments ? (
        (comments || []).map(comment => {
          return (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'flex-start',
                  paddingLeft: '20px'
                }}
              >
                <p>
                  {comment.content}
                  <br />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: 'small', paddingLeft: '5px' }}>
                      {comment.user}
                      {'______'}
                      {parseTimestamp(comment.date_updated)}
                    </p>
                  </div>
                </p>
              </div>
            </>
          )
        })
      ) : (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
    </CommentsWrapper>
  )
}
export default Comments
