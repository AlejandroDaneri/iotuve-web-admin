import React from 'react'
import './App.css'

const files = [
  {
    id: '12313',
    name: 'Batman Inicia Trailer',
    duration: '1:21',
    author: 'Sebastian Ripari'
  },
  {
    id: '12343',
    name: ' Joker Trailer',
    duration: '3:24',
    author: 'Alejandro Daneri'
  },
  {
    id: '42343',
    name: 'Boca VS River',
    duration: '1:20:24',
    author: 'Martin Gonzales'
  }
]

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Web Admin</h1>
        <h2>Files</h2>
        <table>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Author</th>
          </tr>
          {files.map(file => {
            return (
              <tr key={file.id}>
                <td>{file.name}</td>
                <td>{file.duration}</td>
                <td>{file.author}</td>
              </tr>
            )
          })}
        </table>
      </header>
    </div>
  )
}

export default App
