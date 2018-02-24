import { combineReducers } from 'redux-immutable'
import ui from './ui/uiReducers'// import routes from './routes';
import github from './data/githubReducers'// import routes from './routes';

const rootReducer = combineReducers({
  ui,
  github,
})

export default rootReducer
