import {
  GET_SUMMARY_START,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_FAILURE,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_NATIONALITIES_START,
  GET_NATIONALITIES_SUCCESS,
  GET_NATIONALITIES_FAILURE,
  GET_USER_DETAILS_START,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  GET_NATIONALITIES_HASH,
  GET_RANKS_START,
  GET_RANKS_SUCCESS,
  GET_RANKS_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_FINISH
} from '../actions/types'

const initialState = {
  summary: {
    data: {
      Trainings: []
    },
    loading: false,
    error: null
  },
  users: {
    data: [],
    loading: false,
    error: null
  },
  nationalities: {
    data: [],
    loading: false,
    error: null
  },
  userDetails: {
    data: {},
    loading: false,
    error: null
  },
  nationalitiesHash: {},
  loading: {
    isUserDetailsLoading: false
  },
  ranks: {
    loading: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY_START: {
      return {
        ...state,
        summary: {
          data: { ...state.summary.data },
          loading: true,
          error: null
        }
      }
    }
    case GET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: {
          data: action.payload,
          loading: false,
          error: null
        }
      }
    case GET_SUMMARY_FAILURE:
      return {
        ...state,
        summary: {
          data: { ...state.summary.data },
          loading: false,
          error: action.payload
        }
      }
    case GET_USERS_START: {
      const users = state.users.data.map(item => ({ ...item }))
      return {
        ...state,
        users: {
          data: users,
          loading: true,
          error: null
        }
      }
    }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: {
          data: action.payload,
          loading: false,
          error: null
        }
      }
    case GET_USERS_FAILURE: {
      const users = state.users.data.map(item => ({ ...item }))
      return {
        ...state,
        users: {
          data: users,
          loading: false,
          error: action.payload
        }
      }
    }
    case GET_NATIONALITIES_START: {
      const nationalities = state.nationalities.data.map(item => ({ ...item }))
      return {
        ...state,
        nationalities: {
          data: nationalities,
          loading: true,
          error: null
        }
      }
    }
    case GET_NATIONALITIES_SUCCESS:
      return {
        ...state,
        nationalities: {
          ...state.nationalities,
          data: action.payload,
          loading: false,
          error: null
        }
      }
    case GET_NATIONALITIES_FAILURE: {
      const nationalities = state.nationalities.data.map(item => ({ ...item }))
      return {
        ...state,
        nationalities: {
          data: nationalities,
          loading: false,
          error: action.payload
        }
      }
    }
    case GET_USER_DETAILS_START:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: { ...state.userDetails.data },
          loading: true,
          error: null
        }
      }
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: action.payload,
          loading: false,
          error: null
        }
      }
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: { ...state.userDetails.data },
          loading: false,
          error: action.payload
        }
      }
    case UPDATE_USER_START:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: { ...state.userDetails.data },
          loading: true,
          error: null
        }
      }
    case UPDATE_USER_FINISH:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: { ...state.userDetails.data },
          loading: false,
          error: null
        }
      }
    case GET_NATIONALITIES_HASH:
      return { ...state, nationalitiesHash: action.payload }
    case GET_RANKS_START: {
      return {
        ...state,
        ranks: {
          loading: true
        }
      }
    }
    case GET_RANKS_SUCCESS:
      return {
        ...state,
        ranks: {
          loading: false
        }
      }
    case GET_RANKS_FAILURE: {
      return {
        ...state,
        ranks: {
          loading: false
        }
      }
    }
    default:
      return state
  }
}
