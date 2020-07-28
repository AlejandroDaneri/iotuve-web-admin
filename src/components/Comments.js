import React, { useEffect, useState } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import { COLOR_ACTIONS, COLOR_ERROR, COLOR_PRIMARY } from '../constants'
import { getComments, removeComment } from '../webapi'
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
import { Snackbar, SnackbarContent } from '@material-ui/core'
import _ from 'lodash'

const Comments = () => {
  const { video_id: videoID } = useParams()

  const [comments, setComments] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [rmvSuccess, setRmvSuccess] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [selected, changeSelected] = useState({})

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
    getComments(videoID)
      .then(response => {
        const { data } = response
        setComments(data.data)
      })
      .catch(_ => {})
  }, [videoID])

  function parseTimestamp (timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }

  function doRemoveComment () {
    removeComment(selected.id)
      .then(() => {
        setComments(_.without(comments, selected))
        setRmvSuccess(true)
        setShowSnackbar(true)
        setOpenModal(false)
      })
      .catch(_ => {
        setRmvSuccess(false)
        setShowSnackbar(true)
      })
  }

  return (
    <CommentsWrapper>
      <DeleteModal
        resource='comentario'
        modalOpen={openModal}
        changeModalOpen={setOpenModal}
        remove={doRemoveComment}
      />
      <Snackbar
        open={showSnackbar}
        onClose={() => setRmvSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message={
            rmvSuccess
              ? 'Comentario borrado con éxito'
              : 'Error al borrar el comentario, intente de nuevo'
          }
          style={{
            color: 'black',
            backgroundColor: rmvSuccess ? COLOR_PRIMARY : COLOR_ERROR,
            fontSize: '14px'
          }}
        />
      </Snackbar>
      <h2>Comentarios</h2>
      {comments ? (
        <Table>
          <TableBody>
            {comments.length <= 0 ? (
              <center>
                <h3>No hay comentarios en la publicación</h3>
              </center>
            ) : (
              comments.map(comment => {
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
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <p
                                style={{
                                  fontSize: 'small',
                                  paddingLeft: '5px'
                                }}
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
                            changeSelected(comment)
                            setOpenModal(true)
                          }}
                        />
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      ) : (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
    </CommentsWrapper>
  )
}
export default Comments
