import React, { useEffect, useState } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import { AUTH_LOGOUT, COLOR_ACTIONS, COLOR_PRIMARY } from '../constants'
import { getComments } from '../webapi'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { CommentsWrapper } from '../styles/CommentsStyled'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteModal from './Modal'

const Comments = () => {
  const { video_id: videoID } = useParams()

  const [comments, setComments] = useState()
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()

  const StyledTableCell = withStyles(theme => ({
    body: {
      fontSize: 16,
      color: COLOR_PRIMARY
    },
    root: {
      borderBottom: 'none'
    }
  }))(TableCell)

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:hover': {
        backgroundColor: '#414855'
      }
    }
  }))(TableRow)

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
      <DeleteModal
        resource='comentario'
        modalOpen={openModal}
        changeModalOpen={setOpenModal}
      />
      <h2>Comentarios</h2>
      {comments ? (
        <Table>
          <TableBody>
            {(comments || []).map(comment => {
              return (
                <StyledTableRow key={comment.id}>
                  <StyledTableCell>
                    <>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignSelf: 'flex-start',
                          paddingLeft: '5px'
                        }}
                      >
                        <p>
                          {comment.content}
                          <br />
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <p
                              style={{ fontSize: 'small', paddingLeft: '5px' }}
                            >
                              <Link
                                to={`/user/${comment.user}`}
                                style={{ color: 'white' }}
                              >
                                {comment.user}
                              </Link>{' '}
                              {parseTimestamp(comment.date_updated)}
                            </p>
                          </div>
                        </p>
                      </div>
                    </>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title='Eliminar comentario'>
                      <DeleteForeverIcon
                        style={{ color: COLOR_ACTIONS }}
                        onClick={() => {
                          setOpenModal(true)
                        }}
                      />
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
    </CommentsWrapper>
  )
}
export default Comments
