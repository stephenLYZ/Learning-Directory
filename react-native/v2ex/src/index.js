import React, { Component } from 'react'
import { Provider } from 'react-redux'

import App from './views/App'
import store from './redux/store/configureStore'

export default class root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
