const auth = require('../controllers/user.js')
const Router = require('koa-router')

const router = new Router()

router.get('/user/:id', auth.getUserInfo)
router.post('/user', auth.postUserAuth)

module.exports = router