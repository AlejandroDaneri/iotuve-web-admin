import React, { useEffect, useState } from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import { FilesWrapper } from '../styles/FilesStyled'
import { getVideos } from '../webapi'

const Files = () => {
  const [files, changeFiles] = useState()

  useEffect(() => {
    getVideos()
      .then(response => {
        const { data } = response
        changeFiles(Object.values(data))
      })
      .catch(_ => {
        console.error('Video list request fail')
      })
  }, [])

  return (
    <FilesWrapper>
      <h2>Archivos</h2>
      {files ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tamaño (MB)</th>
              <th>Tipo</th>
              <th>URL</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {(files || []).map(file => {
              return (
                <tr key={file.id}>
                  <td>
                    {file.name.split('/')[file.name.split('/').length - 1]}
                  </td>
                  <td>{(file.size / 1000 / 1000).toPrecision(3)}</td>
                  <td>{file.type}</td>
                  <td>
                    <a href={file.url}>Link</a>
                  </td>
                  <td>
                    <a href={file.thumb}>
                      <img
                        alt='thumb'
                        width='80px'
                        height='40px'
                        src={file.thumb}
                      />
                    </a>
                  </td>
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
