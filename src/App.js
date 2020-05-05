import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CircleLoader from 'react-spinners/CircleLoader'

function baseUrl () {
  if (process.env.NODE_ENV === 'production')
    return process.env.REACT_APP_MEDIA_SERVER
  return ''
}

const App = () => {
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
    <div className='App'>
      <header className='App-header'>
        <h1>Web Admin</h1>
        <h2>Files</h2>
        {!files && <CircleLoader color='#61dafb' size={250} />}
        {files && (
          <table>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>URL</th>
            </tr>
            {(files || []).map(file => {
              return (
                <tr key={file.id}>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>
                    <a href={file.url}>Link</a>
                  </td>
                </tr>
              )
            })}
          </table>
        )}
      </header>
    </div>
  )
}

export default App
