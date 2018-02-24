const api = require('../controllers/todolist.js')
const Router = require('koa-router')

router = new Router()

router.get('/todolist/:userId', api.getTodolist)
router.post('/todolist', api.createTodolist)
router.delete('/todolist/:userId/:id', api.removeTodolist)
router.put('/todolist/:userId/:id/:status', api.updateTodolist)

module.exports = router