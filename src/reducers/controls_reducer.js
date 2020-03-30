import { SET_LANGUAGE } from "../actions/types";

const initialState = {
  lang: {
    value: "eng"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, lang: { value: action.payload } };
    default:
      return state;
  }
};
