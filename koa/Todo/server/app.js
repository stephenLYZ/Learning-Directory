const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const path = require('path')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const historyApiFallback = require('koa2-history-api-fallback')

const auth = require('./routes/auth.js')
const api = require('./routes/api.js')

const app = new Koa()
const router = new Router()

app.use(logger())
app.use(json())
app.use(bodyParser())

app.use(async function(ctx, next){
  let start = new Date
  await next()
  let ms = new Date - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', (err, ctx) =>
  log.error('server error', err, ctx)
)

router.use('/auth', auth.routes())
router.use('/api', jwt({ secret: 'vue-koa-demo' }), api.routes())

app.use(router.routes())
app.use(historyApiFallback())
// app.use(serve(path.resolve('dist')))

app.listen(8999, () => {
  console.log('Koa is listening in 8999')
})

module.exports = app
