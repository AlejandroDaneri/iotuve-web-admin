import React, { useState } from 'react'
import './App.css'
import { AppWrapper } from './styles/AppStyled'
import Files from './components/Files'
import styled from 'styled-components'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const Button = styled.div`
  background-color: #61dafb;
  color: black;
  cursor: pointer;
  width: 80%;
`

const App = () => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')

  function onSubmit (e) {
    e.preventDefault()
  }

  return (
    <div className='App'>
      <AppWrapper>
        <Router>
          <h1>Web Admin</h1>
          <Switch>
            <Route exact path='/'>
              <div className='menu'>
                <Link to='/files' className='link'>
                  <Button>Files</Button>
                </Link>
                <Link to='/health' className='link'>
                  <Button>Health</Button>
                </Link>
                <form className='login-form' onSubmit={onSubmit}>
                  <input
                    value={username}
                    onChange={e => changeUsername(e.target.value)}
                    placeholder='Username'
                  />
                  <input
                    value={password}
                    onChange={e => changePassword(e.target.value)}
                    type='password'
                    placeholder='Password'
                  />
                  <button type='submit'>Log In</button>
                </form>
              </div>
            </Route>
            <Route path='/files' component={Files} />
          </Switch>
        </Router>
      </AppWrapper>
    </div>
  )
}

export default App
