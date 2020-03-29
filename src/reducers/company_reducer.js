import {
  GET_SUMMARY,
  GET_USERS,
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
} from "../actions/types";

const initialState = {
  summary: {},
  users: [],
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
    data: [],
    loading: false,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY:
      return { ...state, summary: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case GET_NATIONALITIES_START: {
      const nationalities = state.nationalities.data.map(item => ({ ...item }));
      return {
        ...state,
        nationalities: {
          data: nationalities,
          loading: true,
          error: null
        }
      };
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
      };
    case GET_NATIONALITIES_FAILURE: {
      const nationalities = state.nationalities.data.map(item => ({ ...item }));
      return {
        ...state,
        nationalities: {
          data: nationalities,
          loading: false,
          error: action.payload
        }
      };
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
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: action.payload,
          loading: false,
          error: null
        }
      };
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: { ...state.userDetails.data },
          loading: false,
          error: action.payload
        }
      };
    case UPDATE_USER_START:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: { ...state.userDetails.data },
          loading: true,
          error: null
        }
      };
    case UPDATE_USER_FINISH:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          data: { ...state.userDetails.data },
          loading: false,
          error: null
        }
      };
    case GET_NATIONALITIES_HASH:
      return { ...state, nationalitiesHash: action.payload };
    case GET_RANKS_START: {
      const ranks = state.ranks.data.map(item => ({ ...item }));
      return {
        ...state,
        ranks: {
          data: ranks,
          loading: true,
          error: null
        }
      };
    }
    case GET_RANKS_SUCCESS:
      return {
        ...state,
        ranks: {
          data: action.payload,
          loading: false,
          error: null
        }
      };
    case GET_RANKS_FAILURE: {
      const ranks = state.ranks.data.map(item => ({ ...item }));
      return {
        ...state,
        ranks: {
          data: ranks,
          loading: false,
          error: action.payload
        }
      };
    }
    default:
      return state;
  }
};
