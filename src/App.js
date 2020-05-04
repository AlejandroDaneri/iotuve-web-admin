import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
require('dotenv').config()

/*
const filesMock = [
  {
    id: '12313',
    name: 'Batman Inicia Trailer',
    size: 12313,
    url: 'www.google.com'
  },
  {
    id: '12343',
    name: ' Joker Trailer',
    size: 10313,
    url: 'www.google.com'
  },
  {
    id: '42343',
    name: 'Boca VS River',
    size: 15313,
    url: 'www.google.com'
  }
]
*/

function App () {
  const baseUrl = process.env.REACT_APP_MEDIA_SERVER_STAGING
  console.error(baseUrl)
  const [files, changeFiles] = useState([])
  useEffect(() => {
    axios
      .get(baseUrl + '/list')
      .then(response => {
        changeFiles(response.data.videos)
      })
      .catch(err => {
        console.error(err)
      })
  }, [baseUrl])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Web Admin</h1>
        <h2>Files</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>URL</th>
          </tr>
          {files.map(file => {
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
      </header>
    </div>
  )
}

export default App
