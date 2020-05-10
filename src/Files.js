import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CircleLoader from 'react-spinners/CircleLoader'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Button = styled.div`
  background-color: #61dafb;
  color: black;
  cursor: pointer;
`

export const FilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .link {
    width: 10%;
  }
`

function baseUrl () {
  if (process.env.NODE_ENV === 'production')
    return process.env.REACT_APP_MEDIA_SERVER
  return ''
}

const Files = () => {
  const [files, changeFiles] = useState()
  useEffect(() => {
    axios
      .get(baseUrl() + '/list')
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
      <Link to='/' className='link'>
        <Button>Home</Button>
      </Link>
      <h2>Files</h2>
      {!files && <CircleLoader color='#61dafb' size={250} />}
      {files && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size (MB)</th>
              <th>Type</th>
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
                    <img
                      alt='thumb'
                      width='80px'
                      height='40px'
                      src={file.thumb}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </FilesWrapper>
  )
}

export default Files
