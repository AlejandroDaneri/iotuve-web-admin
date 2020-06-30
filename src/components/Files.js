/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Modal from 'styled-react-modal'
import _ from 'lodash'
import { Snackbar, SnackbarContent } from '@material-ui/core'

/* Import Styled Components */
import { FilesWrapper } from '../styles/FilesStyled'
import { StyledTableCell, StyledTableRow } from '../styles/TableStyled'
import { ButtonDelete } from '../styles/ButtonsStyled'

/* Import WebApi */
import { getVideos, removeVideo } from '../webapi'

/* Import Constants */
import { AUTH_LOGOUT } from '../constants'

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 10%;
  align-items: center;
  justify-content: center;
  background-color: #282c34;
  color: #61dafb;

  & .actions {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 1%;

    > button {
      margin: 1%;
    }
  }
`

const DeleteModal = ({ name, modalOpen, changeModalOpen, remove }) => {
  return (
    <StyledModal
      isOpen={modalOpen}
      onBackgroundClick={null}
      onEscapeKeydown={null}
    >
      <span>Esta seguro que desea borrar el video {name}?</span>
      <div className='actions'>
        <button onClick={() => changeModalOpen(false)}>Cancelar</button>
        <button onClick={remove}>Aceptar</button>
      </div>
    </StyledModal>
  )
}

const Files = () => {
  const [files, changeFiles] = useState()
  const [selected, changeSelected] = useState({})
  const [modalOpen, changeModalOpen] = useState()
  const [informOpen, changeInformOpen] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    getVideos()
      .then(response => {
        const { data } = response
        changeFiles(data.data.map(video => video.media))
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

  return (
    <FilesWrapper>
      <DeleteModal
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
          message='Usuario borrado con exito'
          style={{
            color: 'black',
            backgroundColor: '#61dafb',
            fontSize: '14px'
          }}
        />
      </Snackbar>
      <h2>Archivos</h2>
      {files ? (
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Archivo</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Tamaño</StyledTableCell>
              <StyledTableCell>Formato</StyledTableCell>
              <StyledTableCell>Fecha de creación</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(files || []).map(file => {
              return (
                <StyledTableRow key={file.video_id}>
                  <StyledTableCell>
                    <a href={file.url}>
                      <img
                        alt='thumb'
                        width='80px'
                        height='40px'
                        src={file.thumb}
                      />
                    </a>
                  </StyledTableCell>
                  <StyledTableCell>{file.name}</StyledTableCell>
                  <StyledTableCell>
                    {(file.size / 1024 / 1024).toPrecision(3)}
                  </StyledTableCell>
                  <StyledTableCell>{file.type}</StyledTableCell>
                  <StyledTableCell>{file.date_created}</StyledTableCell>
                  <StyledTableCell className='actions'>
                    <ButtonDelete
                      onClick={() => {
                        changeSelected(file)
                        changeModalOpen(true)
                      }}
                      className='material-icons'
                    >
                      delete_forever
                    </ButtonDelete>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </FilesWrapper>
  )
}

export default Files
