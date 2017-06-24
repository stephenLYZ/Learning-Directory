const db = require('../config/db.js')
const TodolistDb = db.Todolist
const List = TodolistDb.import('../schema/list.js')

const getListById = async function(user_id) {
  const todolist = await List.findAll({
  	where: {
  	  user_id: user_id
  	},
  	attributes: ['id', 'content', 'status']
  })
  return todolist
}

const createTodolist = async function(data) {
  await List.create({
  	user_id: data.id,
  	content: data.content,
  	status: data.status
  })
  return true
}

const removeTodolist = async function(id, user_id) {
  await List.destroy({
  	where: {
  	  id,
  	  user_id
  	}
  })
  return true
}

const updateTodolist = async function(id, user_id, status) {
  await List.update(
  	{
  	  status
  	},
  	{
  	  where: {
  	  	id,
  	  	user_id
  	  }
  	}
  )
  return true
}

module.exports = {
  getListById,
  createTodolist,
  removeTodolist,
  updateTodolist
}