import { combineReducers } from "redux";
import currentUser from "./auth_reducer";
import company from "./company_reducer";
import controls from "./controls_reducer";

const rootReducer = combineReducers({
  currentUser,
  company,
  controls
});

export default rootReducer;
