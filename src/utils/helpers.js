import axios from 'axios'

export const getDataRequest = (path, token) =>
  axios.get(`/Data/${path}`, { headers: { SessionToken: token } })
