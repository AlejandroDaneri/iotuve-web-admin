import React from 'react'
import { AppWrapper } from './styles/AppStyled'
import { Button } from './styles/ButtonStyled'
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Files from './components/Files'
import Login from './components/Login'
import Health from './components/Health'
import { isAuthed } from './stateapi/auth'

const PrivateRoute = ({ ...rest }) => {
  const authed = useSelector(isAuthed)

  if (authed) {
    return <Route {...rest} />
  } else {
    return <Redirect to='/' />
  }
}

const App = () => {
  const authed = useSelector(isAuthed)

  const dispatch = useDispatch()

  function logOut () {
    dispatch({
      type: 'AUTH_LOGOUT'
    })
  }

  return (
    <AppWrapper>
      <Router>
        <h1>Web Admin</h1>
        <Switch>
          <Route exact path='/'>
            {authed ? (
              <div className='menu'>
                <Link to='/files' className='link'>
                  <Button>Archivos</Button>
                </Link>
                <Link to='/health' className='link'>
                  <Button>Estado</Button>
                </Link>
                <span onClick={() => logOut()} className='material-icons'>
                  power_settings_new
                </span>
              </div>
            ) : (
              <Login />
            )}
          </Route>
          <PrivateRoute path='/files' component={Files} />
          <PrivateRoute path='/health' component={Health} />
        </Switch>
      </Router>
    </AppWrapper>
  )
}

export default App
