import { combineReducers } from 'redux-immutable'
import counterReducers from './counterReducers'

const rootReducer = combineReducers({
  counterReducers
})

export default rootReducer
