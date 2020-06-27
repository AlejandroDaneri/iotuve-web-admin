/* Import Libs */
import React from 'react'
import { useSelector } from 'react-redux'
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
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
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'

/* Import Styled Components */
import { AppWrapper } from './styles/AppStyled'

/* Import Components */
import Files from './components/Files'
import Login from './components/Login'
import Health from './components/Health'
import User from './components/User'
import UserAdmin from './components/UserAdmin'
import Users from './components/Users'
import UsersAdmin from './components/UsersAdmin'
import ChangePassword from './components/ChangePassword'
import LogOut from './components/LogOut'

/* Import StateApi */
import { isAuthed, isAuthing } from './stateapi/auth'

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
  sidebar: { backgroundColor: '#1e3c5c', width: 'inherit' },
  menuItem: { color: '#96a1af' }
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
              style={{ width: '215px' }}
              variant='persistent'
              anchor='left'
              open
              classes={{ paper: classes.sidebar }}
            >
              <div style={{ placeSelf: 'end', padding: '10px' }}>
                <LogOut />
              </div>
              <h1 className={classes.menuItem}>
                <center>Web Admin</center>
              </h1>
              <Divider />
              <Divider />
              <List>
                <Link to='/files'>
                  <ListItem button>
                    <ListItemIcon className={classes.menuItem}>
                      <VideoLibraryIcon />
                    </ListItemIcon>
                    <Tooltip title='Ver los archivos que fueron subidos'>
                      <ListItemText
                        className={classes.menuItem}
                        primary='Archivos'
                      />
                    </Tooltip>
                  </ListItem>
                </Link>
              </List>
              <List>
                <Link to='/users'>
                  <ListItem button>
                    <ListItemIcon className={classes.menuItem}>
                      <PersonIcon />
                    </ListItemIcon>
                    <Tooltip title='Ver los usarios que están registrados'>
                      <ListItemText
                        className={classes.menuItem}
                        primary='Usuarios'
                      />
                    </Tooltip>
                  </ListItem>
                </Link>
              </List>
              <List>
                <Link to='/users_admin'>
                  <ListItem button>
                    <ListItemIcon className={classes.menuItem}>
                      <SupervisorAccountIcon />
                    </ListItemIcon>
                    <Tooltip title='Ver los admins que están registrados'>
                      <ListItemText
                        className={classes.menuItem}
                        primary='Admins'
                      />
                    </Tooltip>
                  </ListItem>
                </Link>
              </List>
              <List>
                <ListItem button>
                  <ListItemIcon className={classes.menuItem}>
                    <ShowChartIcon />
                  </ListItemIcon>
                  <Tooltip title='Ver estadísticas de los servidores'>
                    <ListItemText
                      className={classes.menuItem}
                      primary='Estadisticas'
                    />
                  </Tooltip>
                </ListItem>
              </List>
              <Divider />
              <Divider />
              <List>
                <Link to='/health'>
                  <ListItem button>
                    <ListItemIcon className={classes.menuItem}>
                      <DoneIcon />
                    </ListItemIcon>
                    <Tooltip title='Ver el estado actual de los servidores'>
                      <ListItemText
                        className={classes.menuItem}
                        primary='Estado actual'
                      />
                    </Tooltip>
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
