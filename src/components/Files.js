/* Import Libs */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'

/* Import Styled Components */
import { FilesWrapper } from '../styles/FilesStyled'
import { StyledTableCell, StyledTableRow } from '../styles/TableStyled'

/* Import WebApi */
import { getVideos } from '../webapi'

const Files = () => {
  const [files, changeFiles] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    getVideos()
      .then(response => {
        const { data } = response
        changeFiles(Object.values(data.videos))
      })
      .catch(err => {
        console.error(err)
        if (err.response !== 500) {
          dispatch({
            type: 'AUTH_LOGOUT'
          })
        }
      })
  }, [dispatch])

  return (
    <FilesWrapper>
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
