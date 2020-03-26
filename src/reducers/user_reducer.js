import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
