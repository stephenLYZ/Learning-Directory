const todolist = require('../models/todolist.js')

const getTodolist = async function(ctx) {
  const user_id = ctx.params.userId
  const result = await todolist.getListById(user_id)
  ctx.body = result
}

const createTodolist = async function(ctx) {
  const data = ctx.request.body
  console.log(data)
  const result = await todolist.createTodolist(data)
  ctx.body = {
  	success: true
  }
}

const removeTodolist = async function(ctx) {
  const id = ctx.params.id
  const user_id = ctx.params.userId
  const result = await todolist.removeTodolist(id, user_id)
  ctx.body = {
  	success: true
  }
}

const updateTodolist = async function(ctx) {
  const id = ctx.params.id
  const user_id = ctx.params.userId
  let status = ctx.params.status
  status = status === '0' ? true : false
  const result = await todolist.updateTodolist(id, user_id, status)
  ctx.body = {
  	success: true
  }
}

module.exports = {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}