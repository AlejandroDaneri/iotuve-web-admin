import axios from 'axios'

import { store } from '../index'

axios.interceptors.request.use(
  config => {
    config.headers['X-Admin'] = 'true'
    config.headers['X-Client-ID'] = '38d1fcaf-3a8b-4dfe-9ca4-2e0473b442ba'
    config.headers['X-Auth-Token'] = store.getState().auth.token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

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
  return axios.get(appBaseUrl() + '/api/v1/videos')
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
  return axios.post(appBaseUrl() + '/api/v1/sessions', user)
}

export function doLogOut () {
  return axios.delete(appBaseUrl() + `/api/v1/sessions`)
}

export function getUsers () {
  return axios.get(appBaseUrl() + '/api/v1/users')
}

export function getUser (username) {
  return axios.get(appBaseUrl() + `/api/v1/users/${username}`)
}

export function getUserSessions (username) {
  return axios.get(appBaseUrl() + `/api/v1/users/${username}/sessions`)
}

export function closeUserSession (sessionId) {
  return axios.delete(appBaseUrl() + `/api/v1/sessions/${sessionId}`)
}

export function getUserAdminSessions (username) {
  return axios.get(appBaseUrl() + `/api/v1/adminusers/${username}/sessions`)
}

export function getAdminUser (username) {
  return axios.get(appBaseUrl() + `/api/v1/adminusers/${username}`)
}

export function saveUser (username, user) {
  return axios.put(appBaseUrl() + `/api/v1/users/${username}`, user)
}

export function saveAdminUser (username, user) {
  return axios.put(appBaseUrl() + `/api/v1/adminusers/${username}`, user)
}

export function getUsersAdmin () {
  return axios.get(appBaseUrl() + '/api/v1/adminusers')
}

export function doRecoveryPassword (key, username, password) {
  return axios.post(appBaseUrl() + `/api/v1/recovery/${username}`, {
    recovery_key: key,
    new_password: password
  })
}

export function doChangeUserPassword (token, username, password) {
  return axios.patch(
    appBaseUrl() + `/api/v1/users/${username}`,
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

export function removeUser (username) {
  return axios.delete(appBaseUrl() + `/api/v1/users/${username}`)
}

export function removeVideo (id) {
  return axios.delete(appBaseUrl() + `/api/v1/videos/${id}`)
}

export function removeAdminUser (username) {
  return axios.delete(appBaseUrl() + `/api/v1/adminusers/${username}`)
}

export function getStats (startDate, endDate) {
  return axios.get(
    `${authBaseUrl()}/stats?startdate=${startDate}&enddate=${endDate}`
  )
}
