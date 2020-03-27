import { GET_SUMMARY } from "../actions/types";

const summary = {
  Trainings: [
    {
      Name: "training one",
      Progress: 56
    },
    {
      Name: "training two",
      Progress: 88
    },
    {
      Name: "training three",
      Progress: 56
    },
    {
      Name: "training four",
      Progress: 12
    }
  ],
  Working: 26
};

const initialState = {
  summary,
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
