import React from 'react'
import { AppWrapper } from './styles/AppStyled'
// import { Button } from './styles/ButtonStyled'
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
// import LogOut from './components/LogOut'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import PersonIcon from '@material-ui/icons/Person'
import DoneIcon from '@material-ui/icons/Done'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
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

const useStyles = makeStyles(theme => ({
  sidebar: { backgroundColor: '#3450bf', width: 'inherit' }
}))

const App = () => {
  const authed = useSelector(isAuthed)
  const classes = useStyles()
  return (
    <AppWrapper>
      <Router>
        <div style={{ display: 'flex' }}>
          {authed && (
            <Drawer
              style={{ width: '200px' }}
              variant='persistent'
              anchor='left'
              open='true'
              classes={{ paper: classes.sidebar }}
            >
              <h1>
                <center>Web Admin</center>
              </h1>

              <List>
                <Link to='/files'>
                  <ListItem button>
                    <ListItemIcon>
                      <VideoLibraryIcon />
                    </ListItemIcon>
                    <ListItemText primary='Archivos' />
                  </ListItem>
                </Link>
              </List>
              <List>
                <Link to='/users'>
                  <ListItem button>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='Usuarios' />
                  </ListItem>
                </Link>
              </List>
              <List>
                <Link to='/users_admin'>
                  <ListItem button>
                    <ListItemIcon>
                      <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary='Admins' />
                  </ListItem>
                </Link>
              </List>
              <List>
                <Link to='/health'>
                  <ListItem button>
                    <ListItemIcon>
                      <DoneIcon />
                    </ListItemIcon>
                    <ListItemText primary='Estado' />
                  </ListItem>
                </Link>
              </List>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <ShowChartIcon />
                  </ListItemIcon>
                  <ListItemText primary='Estadisticas' />
                </ListItem>
              </List>
              <List>
                <Link to='/'>
                  <ListItem button>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Cerrar sesion' />
                  </ListItem>
                </Link>
              </List>
              <LogOut />
            </Drawer>
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
        </div>
      </Router>
    </AppWrapper>
  )
}

export default App
