import { GET_SUMMARY, GET_USERS, GET_NATIONALITIES } from "../actions/types";

const initialState = {
  summary: {},
  users: [],
  nationalities: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY:
      return { ...state, summary: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case GET_NATIONALITIES:
      return { ...state, nationalities: action.payload };
    default:
      return state;
  }
};
