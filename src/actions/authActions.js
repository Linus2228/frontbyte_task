import axios from 'axios'

import {
  toastSuccess,
  toastError,
  toastInfo
} from '../utils/toastNotifications'
import { EXPIRED_SESSION_MESSAGE } from '../constants'
import {
  SET_USER,
  LOGIN_USER_START,
  LOGIN_USER_FINISH,
  LOGOUT_USER_START,
  LOGOUT_USER_FINISH,
  REMOVE_USER
} from './types'
import { clearUserDataInLocalStorage } from '../utils/validation'

let timer = null

export const keepAlive = dispatch => {
  const token = localStorage.getItem('token')
  axios.put(`/session/KeepAlive/${token}`).catch(error => {
    if (error.response.data.ErrorCode === 'InvalidSessionToken') {
      toastError('Please log in')
      clearUserDataInLocalStorage()
      dispatch(removeUser())
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  })
}

export const setUser = user => ({
  type: SET_USER,
  payload: user
})

export const loginUserStart = () => ({
  type: LOGIN_USER_START
})

export const loginUserFinish = () => ({
  type: LOGIN_USER_FINISH
})

export const userLogin = user => dispatch => {
  dispatch(loginUserStart())
  return axios
    .post('/session/logon', user)
    .then(response => {
      dispatch(loginUserFinish())
      timer = setInterval(() => {
        keepAlive(dispatch)
      }, 30000)
      localStorage.setItem('token', response.data.Token)
      localStorage.setItem('userName', user.User)
      localStorage.setItem('companyName', user.Company)
      dispatch(setUser({ userName: user.User, companyName: user.Company }))
      toastSuccess('Congrats on login!')
    })
    .catch(error => {
      dispatch(loginUserFinish())
      if (error.response.status === 400) {
        toastError(error.response.data.ErrorMessage)
      } else {
        toastError('Something went wrong. Please try again')
      }
    })
}

export const keepAliveStart = dispatch => {
  const token = !!localStorage.getItem('token')
  const userName = localStorage.getItem('userName')
  const companyName = localStorage.getItem('companyName')

  if (token) {
    dispatch(setUser({ userName, companyName }))
    timer = setInterval(() => {
      keepAlive(dispatch)
    }, 30000)
  }
}

export const removeUser = () => ({
  type: REMOVE_USER
})

export const logoutUserStart = () => ({
  type: LOGOUT_USER_START
})

export const logotUserFinish = () => ({
  type: LOGOUT_USER_FINISH
})

export const logout = message => dispatch => {
  const token = localStorage.getItem('token')
  dispatch(logoutUserStart())
  return axios
    .delete(`/session/logout/${token}`)
    .then(response => {
      toastInfo(message)
      dispatch(logotUserFinish())
      clearUserDataInLocalStorage()

      dispatch(removeUser())
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    })
    .catch(error => {
      dispatch(logotUserFinish())
      if (error.response.status === 400) {
        dispatch(logout(EXPIRED_SESSION_MESSAGE))
        toastError(error.response.data.ErrorMessage)
      } else {
        toastError('Something went wrong')
      }
    })
}
