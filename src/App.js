import React from 'react'
import './App.css'
import { AppWrapper } from './styles/AppStyled'
import Files from './Files'

const App = () => {
  return (
    <div className='App'>
      <AppWrapper>
        <h1>Web Admin</h1>
        <Files />
      </AppWrapper>
    </div>
  )
}

export default App
