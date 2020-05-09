import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CircleLoader from 'react-spinners/CircleLoader'

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
        changeFiles(response.data.videos)
      })
      .catch(_ => {
        console.error('Video list request fail')
      })
  }, [])
  return (
    <div>
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
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Files
