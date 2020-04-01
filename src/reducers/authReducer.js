import {
  SET_USER,
  LOGIN_USER_START,
  LOGIN_USER_FINISH,
  REMOVE_USER,
  LOGOUT_USER_START,
  LOGOUT_USER_FINISH
} from '../actions/types'

const initialState = {
  currentUser: {},
  isLoginLoading: false,
  isLogoutLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, currentUser: action.payload }
    }
    case LOGIN_USER_START: {
      const user = { ...state.currentUser }
      return { ...state, currentUser: user, isLoginLoading: true }
    }
    case LOGIN_USER_FINISH: {
      const user = { ...state.currentUser }
      return { ...state, currentUser: user, isLoginLoading: false }
    }
    case REMOVE_USER:
      return { ...state, currentUser: {} }
    case LOGOUT_USER_START: {
      return { ...state, isLogoutLoading: true }
    }
    case LOGOUT_USER_FINISH: {
      const user = { ...state.currentUser }
      return { ...state, currentUser: user, isLogoutLoading: false }
    }
    default:
      return state
  }
}
