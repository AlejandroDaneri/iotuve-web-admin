/* Import Libs */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import axios from 'axios'

/* Import Components */
import Files from './components/Files'
import Stats from './components/Stats/Stats'
import StatsDaily from './components/Stats/StatsDaily'
import StatsTotal from './components/Stats/StatsTotal'
import Login from './components/Login'
import User from './components/User/UserMobile/User'
import UserAdmin from './components/User/UserAdmin/UserAdmin'
import Users from './components/Users'
import UsersAdmin from './components/UsersAdmin'
import ChangePassword from './components/ChangePassword'
import Sidebar from './components/Sidebar'
import Comments from './components/Comments'

/* Import StateApi */
import { isAuthed, isAuthing } from './stateapi/auth'

/* Import Styled Components */
import { AppWrapper } from './styles/AppStyled'
import StatsMedia from './components/Stats/StatsMedia'

/* Import Constants */
import { AUTH_LOGOUT } from './constants'

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
  const dispatch = useDispatch()
  const [error, changeError] = useState(false)

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (
          error.response !== 500 &&
          error.response.data.message.includes('session')
        ) {
          changeError(true)
          dispatch({
            type: AUTH_LOGOUT
          })
        }
        return Promise.reject(error)
      }
    )
  }, [dispatch])

  return (
    <AppWrapper>
      <Router>
        <div>
          <Sidebar />
          <Switch>
            {!authed && <Route exact path='/' component={Login} />}
            <PrivateRoute path='/files/:video_id' component={Comments} />
            <PrivateRoute path='/files' component={Files} />
            <PrivateRoute path='/users' component={Users} />
            <PrivateRoute path='/user/:username' component={User} />
            <PrivateRoute path='/user_admin/:username' component={UserAdmin} />
            <PrivateRoute path='/users_admin' component={UsersAdmin} />
            <PrivateRoute path='/stats' component={Stats} />
            <PrivateRoute path='/stats_daily' component={StatsDaily} />
            <PrivateRoute path='/stats_total' component={StatsTotal} />
            <PrivateRoute path='/stats_media' component={StatsMedia} />
            <Route path='/change_password' component={ChangePassword} />
          </Switch>
        </div>
      </Router>

      <Snackbar
        open={error}
        onClose={() => changeError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message='Sesión expirada'
          style={{
            color: 'black',
            backgroundColor: 'red',
            fontSize: '14px'
          }}
        />
      </Snackbar>
    </AppWrapper>
  )
}

export default App
