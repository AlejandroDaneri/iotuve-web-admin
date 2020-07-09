/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import _ from 'lodash'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

/* Import Components */
import DeleteModal from '../components/Modal'

/* Import Styled Components */
import { FilesWrapper } from '../styles/FilesStyled'
import { StyledTableCell, StyledTableRow } from '../styles/TableStyled'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

/* Import WebApi */
import { getVideos, removeVideo } from '../webapi'

/* Import Constants */
import { AUTH_LOGOUT, COLOR_ACTIONS, COLOR_PRIMARY } from '../constants'
import Tooltip from '@material-ui/core/Tooltip'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Files = () => {
  const [files, changeFiles] = useState()

  const [selected, changeSelected] = useState({})
  const [modalOpen, changeModalOpen] = useState()
  const [informOpen, changeInformOpen] = useState()

  const [openCollapse, changeOpenCollapse] = React.useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    getVideos()
      .then(response => {
        const { data } = response
        changeFiles(data.data)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: AUTH_LOGOUT
          })
        }
      })
  }, [dispatch])

  function remove () {
    removeVideo(selected.video_id)
      .then(response => {
        changeFiles(_.without(files, selected))
        changeModalOpen(false)
        changeInformOpen(true)
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: 'AUTH_LOGOUT'
          })
        }
      })
  }

  function parseTimestamp (timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }
  return (
    <FilesWrapper>
      <DeleteModal
        resource='vídeo'
        name={selected.name}
        remove={remove}
        modalOpen={modalOpen}
        changeModalOpen={changeModalOpen}
      />
      <Snackbar
        open={informOpen}
        onClose={() => changeInformOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message='Video borrado con éxito'
          style={{
            color: 'black',
            backgroundColor: COLOR_PRIMARY,
            fontSize: '14px'
          }}
        />
      </Snackbar>
      <h2>Archivos</h2>
      {files ? (
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Archivo</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Tamaño </StyledTableCell>
              <StyledTableCell>Formato</StyledTableCell>
              <StyledTableCell>Fecha de creación</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(files || []).map(file => {
              return (
                <>
                  <StyledTableRow key={file.media.video_id}>
                    <StyledTableCell>
                      <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => {
                          changeOpenCollapse(!openCollapse)
                          changeSelected(file)
                        }}
                      >
                        {openCollapse && selected === file ? (
                          <KeyboardArrowUpIcon
                            style={{ color: COLOR_ACTIONS }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            style={{ color: COLOR_ACTIONS }}
                          />
                        )}
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Tooltip title='Haga click para mostrar el archivo'>
                        <a href={file.media.url}>
                          <img
                            alt='thumb'
                            width='80px'
                            height='40px'
                            src={file.media.thumb}
                          />
                        </a>
                      </Tooltip>
                    </StyledTableCell>
                    <StyledTableCell>{file.media.name}</StyledTableCell>
                    <StyledTableCell>
                      {(file.media.size / 1024 / 1024).toPrecision(3)} MB
                    </StyledTableCell>
                    <StyledTableCell>{file.media.type}</StyledTableCell>
                    <StyledTableCell>
                      {parseTimestamp(file.date_created)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <DeleteForeverIcon
                        style={{ color: COLOR_ACTIONS }}
                        onClick={() => {
                          changeSelected(file)
                          changeModalOpen(true)
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell
                      variant='body'
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse
                        in={openCollapse && selected === file}
                        timeout='auto'
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Typography variant='h6' gutterBottom component='div'>
                            Publicación del video
                          </Typography>
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <div style={{ width: '100%' }}>
                              Subido por: {file.user} <br />
                              Título de la publicación: {file.title} <br />
                              Descripción: {file.description}
                              <br />
                            </div>
                            <div style={{ width: '100%' }}>
                              Vistas: {file.count_views} <br />
                              Likes: {file.count_likes} <br />
                              Unlikes: {file.count_dislikes} <br />
                              Visibilidad:{' '}
                              {file.visibility === 'private'
                                ? 'Privado'
                                : 'Público'}{' '}
                              <br />
                            </div>
                            <div style={{ width: '13%' }}>
                              <Tooltip title='Más informacion'>
                                <AddIcon />
                              </Tooltip>
                            </div>
                          </div>
                        </Box>
                      </Collapse>
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <CircleLoader color={COLOR_PRIMARY} size={250} />
      )}
    </FilesWrapper>
  )
}

export default Files
