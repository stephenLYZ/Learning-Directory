const Sequelize = require('sequelize');

const Todolist = new Sequelize('mysql://root:123456@localhost/todolist', {
  define: {
  	timestamps: false
  }
})

module.exports = {
  Todolist
}