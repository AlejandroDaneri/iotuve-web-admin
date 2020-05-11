import axios from 'axios'

export function baseUrl () {
  if (process.env.NODE_ENV === 'production')
    return process.env.REACT_APP_MEDIA_SERVER
  return ''
}

export function getVideos () {
  return axios.get(baseUrl() + '/list')
}
