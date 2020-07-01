/* Import Libs */
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import PersonIcon from '@material-ui/icons/Person'
import DoneIcon from '@material-ui/icons/Done'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

/* Import Components */
import LogOut from './LogOut'

/* Import StateApi */
import { isAuthed } from '../stateapi/auth'
import Health from './Health'

const Sidebar = props => {
  const { location } = props
  const authed = useSelector(isAuthed)

  const useStyles = makeStyles(_ => ({
    sidebar: { backgroundColor: '#1e3c5c', width: 'inherit' },
    menuItem: { color: '#96a1af' }
  }))

  const classes = useStyles()

  if (location.pathname.match(/change_password/)) {
    return null
  }

  return (
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
                  <ListItemText className={classes.menuItem} primary='Admins' />
                </Tooltip>
              </ListItem>
            </Link>
          </List>
          <List>
            <Link to='/stats'>
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
            </Link>
          </List>
          <Divider />
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon className={classes.menuItem}>
                <DoneIcon />
              </ListItemIcon>

              <ListItemText
                className={classes.menuItem}
                primary='Estado actual'
              />
            </ListItem>
          </List>
          <Health />
          <LogOut />
        </Drawer>
      )}
    </div>
  )
}

export default withRouter(Sidebar)
