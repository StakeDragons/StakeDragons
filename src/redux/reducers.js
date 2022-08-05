import { combineReducers } from 'redux'

import auth from './modules/auth/reducers'
import user from './modules/user/reducers'

export default combineReducers({
  auth,
  user,
})
