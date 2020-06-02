import axios from 'axios'

const APP_SERVER = process.env.REACT_APP_APP_SERVER
const MEDIA_SERVER = process.env.REACT_APP_MEDIA_SERVER
const AUTH_SERVER = process.env.REACT_APP_AUTH_SERVER

export function mediaBaseUrl () {
  if (process.env.NODE_ENV === 'production') return MEDIA_SERVER
  return 'https://fiuba-taller-2-media-server-st.herokuapp.com'
}

export function appBaseUrl () {
  if (process.env.NODE_ENV === 'production') return APP_SERVER
  return 'https://fiuba-taller-2-app-server-st.herokuapp.com'
}

export function authBaseUrl () {
  if (process.env.NODE_ENV === 'production') return AUTH_SERVER
  return 'https://fiuba-taller-2-auth-server-st.herokuapp.com'
}

export function getVideos () {
  return axios.get(mediaBaseUrl() + '/api/v1/videos')
}

export function getMediaStatus () {
  return axios.get(mediaBaseUrl() + '/api/v1/status')
}

export function getAuthStatus () {
  return axios.get(authBaseUrl() + '/status')
}

export function getAppStatus () {
  return axios.get(appBaseUrl() + '/status')
}

export function doAuth (user) {
  return axios.post(appBaseUrl() + '/api/v1/sessions', user)
}

export function getUsers (token) {
  return axios.get(appBaseUrl() + '/api/v1/users', {
    headers: { 'X-Auth-Token': token }
  })
}

export function getUsersAdmin (token) {
  return axios.get(appBaseUrl() + '/api/v1/adminusers', {
    headers: { 'X-Auth-Token': token }
  })
}

export function doChangePassword (key, username, password) {
  return axios.post(appBaseUrl() + `/api/v1/recovery/${username}`, {
    recovery_key: key,
    new_password: password
  })
}

export function removeUser (token, username) {
  return axios.delete(appBaseUrl() + `/api/v1/users/${username}`, {
    headers: { 'X-Auth-Token': token }
  })
}
