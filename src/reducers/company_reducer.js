import { GET_SUMMARY } from "../actions/types";

const initialState = {
  summary: {},
  users: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUMMARY:
      return { ...state, summary: action.payload };
    default:
      return state;
  }
};
