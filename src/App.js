import React from 'react'
import { AppWrapper } from './styles/AppStyled'
import { Button } from './styles/ButtonStyled'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Files from './components/Files'
import Login from './components/Login'
import Health from './components/Health'

const App = () => {
  return (
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
            </div>
            <Login />
          </Route>
          <Route path='/files' component={Files} />
          <Route path='/health' component={Health} />
        </Switch>
      </Router>
    </AppWrapper>
  )
}

export default App
