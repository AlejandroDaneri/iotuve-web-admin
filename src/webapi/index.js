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
  return axios.get(mediaBaseUrl() + '/api/v1/videos', {
    headers: { 'X-Client-ID': '38d1fcaf-3a8b-4dfe-9ca4-2e0473b442ba' }
  })
}

export function getMediaStatus () {
  return axios.get(mediaBaseUrl() + '/status')
}

export function getAuthStatus () {
  return axios.get(authBaseUrl() + '/status')
}

export function getAppStatus () {
  return axios.get(appBaseUrl() + '/status')
}

export function doAuth (user) {
  return axios.post(appBaseUrl() + '/api/v1/sessions', user, {
    headers: { 'X-Admin': 'true' }
  })
}

export function getUsers (token) {
  return axios.get(appBaseUrl() + '/api/v1/users', {
    headers: { 'X-Auth-Token': token }
  })
}

export function getUser (token, username) {
  return axios.get(appBaseUrl() + `/api/v1/users/${username}`, {
    headers: { 'X-Auth-Token': token }
  })
}

export function getAdminUser (token, username) {
  return axios.get(appBaseUrl() + `/api/v1/adminusers/${username}`, {
    headers: { 'X-Auth-Token': token }
  })
}

export function saveUser (token, username, user) {
  return axios.put(appBaseUrl() + `/api/v1/users/${username}`, user, {
    headers: { 'X-Auth-Token': token }
  })
}

export function saveAdminUser (token, username, user) {
  return axios.put(appBaseUrl() + `/api/v1/adminusers/${username}`, user, {
    headers: { 'X-Auth-Token': token }
  })
}

export function getUsersAdmin (token) {
  return axios.get(appBaseUrl() + '/api/v1/adminusers', {
    headers: { 'X-Auth-Token': token }
  })
}

export function doRecoveryPassword (key, username, password) {
  return axios.post(appBaseUrl() + `/api/v1/recovery/${username}`, {
    recovery_key: key,
    new_password: password
  })
}
export function doChangeAdminPassword (token, username, password) {
  return axios.patch(
    appBaseUrl() + `/api/v1/adminusers/${username}`,
    {
      op: 'replace',
      path: '/password',
      value: password
    },
    {
      headers: { 'X-Auth-Token': token }
    }
  )
}

export function removeUser (token, username) {
  return axios.delete(appBaseUrl() + `/api/v1/users/${username}`, {
    headers: { 'X-Auth-Token': token }
  })
}

export function removeAdminUser (token, username) {
  return axios.delete(appBaseUrl() + `/api/v1/adminusers/${username}`, {
    headers: { 'X-Auth-Token': token }
  })
}
