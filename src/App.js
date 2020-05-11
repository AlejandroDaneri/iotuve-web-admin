import React from 'react'
import './App.css'
import { AppWrapper } from './styles/AppStyled'
import { Button } from './styles/ButtonStyled'
import Files from './components/Files'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'

const App = () => {
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
                <Login />
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
