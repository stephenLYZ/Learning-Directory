import express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiidleware from 'webpack-hot-middleware'
import webpackconfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'

import configureStore from '../common/store/configureStore'
import CounterContainer from '../common/containers/CounterContainer'

import { fetchCounter } from '../common/api/index'

const app = express()
const port = 3000

function handleRender(req,res){
  fetchCounter(apiResult => {
    const params = qs.parse(req.query)
    const counter = parseInt(params.counter,10) || apiResult || 0
    const initialState = fromJS({
      counterReducers: {
        count: counter,
      }
    })

    const store = configureStore(initialState)
    const html = renderToString(
      <Provider store={store}>
        <CounterContainer />
      </Provider>
    )
    const finalState = store.getState()
    res.send(renderFullPage(html,finalState))
  })
}

function renderFullPage(html,finalState){
  return `
  <!doctype html>
  <html>
    <head>
      <title> Redux Counter</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\x3c')}
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
}

const compiler = webpack(webpackconfig)
app.use(webpackDevMiddleware(compiler,{
  noInfo: true,
  publicPath: webpackconfig.output.publicPath
}))
app.use(webpackHotMiidleware(compiler))
app.use(handleRender)

app.listen(port,(error) => {
  if(error) {
    console.error(error)
  }else{
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }

})
