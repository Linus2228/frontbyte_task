import { combineReducers } from "redux";
import currentUser from "./user_reducer";
import company from "./company_reducer";

const rootReducer = combineReducers({
  currentUser,
  company
});

export default rootReducer;
