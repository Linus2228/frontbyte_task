import { combineReducers } from 'redux'
import auth from './authReducer'
import company from './companyReducer'
import controls from './controlsReducer'

const rootReducer = combineReducers({
  auth,
  company,
  controls
})

export default rootReducer
