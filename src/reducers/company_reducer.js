import { GET_SUMMARY, GET_USERS } from "../actions/types";

const initialState = {
  summary: {},
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY:
      return { ...state, summary: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
