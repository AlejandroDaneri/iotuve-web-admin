import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import { FilesWrapper } from '../styles/FilesStyled'
import { getVideos } from '../webapi'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    color: '#61dafb'
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#343944'
    },
    '&:hover': {
      backgroundColor: '#414855'
    }
  }
}))(TableRow)

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
