import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import { FilesWrapper } from '../styles/FilesStyled'
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
      .catch(_ => {
        dispatch({
          type: 'AUTH_LOGOUT'
        })
      })
  }, [dispatch])

  return (
    <FilesWrapper>
      <h2>Archivos</h2>
      {files ? (
        <table>
          <thead>
            <tr>
              <th>Archivo</th>
              <th>Nombre</th>
              <th>Tamaño (MB)</th>
              <th>Formato</th>
            </tr>
          </thead>
          <tbody>
            {(files || []).map(file => {
              return (
                <tr key={file.video_id}>
                  <td>
                    <a href={file.url}>
                      <img
                        alt='thumb'
                        width='80px'
                        height='40px'
                        src={file.thumb}
                      />
                    </a>
                  </td>
                  <td>{file.name}</td>
                  <td>{(file.size / 1024 / 1024).toPrecision(3)}</td>
                  <td>{file.type}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <CircleLoader color='#61dafb' size={250} />
      )}
    </FilesWrapper>
  )
}

export default Files
