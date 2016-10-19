import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index'

export default function configureStore(preloadedState){
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(createLogger({ stateTransformer: state => state.toJS() }), thunk)
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
