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
import { useSelector } from 'react-redux'
import Files from './components/Files'
import Login from './components/Login'
import Health from './components/Health'
import User from './components/User'
import UserAdmin from './components/UserAdmin'
import Users from './components/Users'
import UsersAdmin from './components/UsersAdmin'
import ChangePassword from './components/ChangePassword'
import { isAuthed, isAuthing } from './stateapi/auth'
import LogOut from './components/LogOut'

const PrivateRoute = ({ ...rest }) => {
  const authed = useSelector(isAuthed)
  const authing = useSelector(isAuthing)

  if (authing) {
    return 'Authing'
  } else if (authed) {
    return <Route {...rest} />
  } else {
    return <Redirect to='/' />
  }
}

const App = () => {
  const authed = useSelector(isAuthed)

  return (
    <AppWrapper>
      <Router>
        <h1>ChoTuve - Web Admin</h1>
        {authed && (
          <div className='menu'>
            <Link to='/' className='link'>
              <Button>Inicio</Button>
            </Link>
            <Link to='/files' className='link'>
              <Button>Archivos</Button>
            </Link>
            <Link to='/users' className='link'>
              <Button>Usuarios</Button>
            </Link>
            <Link to='/users_admin' className='link'>
              <Button>Admins</Button>
            </Link>
            <Link to='/health' className='link'>
              <Button>Estado</Button>
            </Link>
            <LogOut />
          </div>
        )}
        <Switch>
          {!authed && <Route exact path='/' component={Login} />}
          <PrivateRoute path='/files' component={Files} />
          <PrivateRoute path='/users' component={Users} />
          <PrivateRoute path='/user/:username' component={User} />
          <PrivateRoute path='/user_admin/:username' component={UserAdmin} />
          <PrivateRoute path='/users_admin' component={UsersAdmin} />
          <PrivateRoute path='/health' component={Health} />
          <Route path='/change_password' component={ChangePassword} />
        </Switch>
      </Router>
    </AppWrapper>
  )
}

export default App
