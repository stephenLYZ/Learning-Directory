<template>
  <el-row class="content">
  	<el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
  	  <span>
  	  	Hello, {{ name }}! 你的待办事项是:
  	  </span>
  	  <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
  	  <el-tabs v-model="activeName">
  	  	<el-tab-pane label="待办事项" name="first">
  	  	  <el-col :xs="24">
  	  	  	<template v-if="!isDone">
  	  	  	  <template v-for="(item, index) in list">
  	  	  	  	<div class="todo-list" v-if="item.status == false">
  	  	  	  	  <span class="item">
  	  	  	  	  	{{ index + 1 }}.  {{ item.content }}
  	  	  	  	  </span>
  	  	  	  	  <span class="pull-right">
  	  	  	  	  	<el-button size="small" type="primary" @click="update(index)">完成</el-button>
  	  	  	  	  	<el-button size="small" type="danger" :plain="true" @click="remove(index)">删除</el-button>
  	  	  	  	  </span>
  	  	  	  	</div>
  	  	  	  </template>
  	  	  	</template>
  	  	  	<div v-else>
  	  	  	  暂无待办事项
  	  	  	</div>
  	  	  </el-col>
  	  	</el-tab-pane>
  	  	<el-tab-pane label="已完成事项" name="second">
  	  	  <template v-if="count > 0">
  	  	  	<template v-for="(item, index) in list">
  	  	  	  <div class="todo-list" v-if="item.status == true">
  	  	  	  	<span class="item completed">
  	  	  	  	  {{ index + 1 }}.  {{ item.content }}
  	  	  	  	</span>
  	  	  	  	<span class="pull-right">
  	  	  	  	  <el-button size="small" type="primary" @click="update(index)">还原</el-button>
  	  	  	  	</span>
  	  	  	  </div>
  	  	  	</template>
  	  	  </template>
  	  	  <div v-else>
  	  	  	暂无已完成事项
  	  	  </div>
  	  	</el-tab-pane>
  	  </el-tabs>
  	</el-col>
  </el-row>
</template>

<script>

import jwt from 'jsonwebtoken'

export default {
  created() {
    const userInfo = this.getUserInfo()
    if (userInfo) {
      this.id = userInfo.id
      this.name = userInfo.name
    } else {
      this.id = ''
      this.name = ''
    }
    this.getTodolist()
  },

  data() {
  	return {
      id: '',
  	  name: '',
  	  todos: '',
  	  activeName: 'first',
  	  list: [],
  	  count: 0
  	}
  },
  computed: {
  	isDone() {
  	  let length = this.list.length;
  	  let count = this.list.reduce((num, item) => {
  	  	if (item.status == true) {
  	  	  return ++num;
  	  	} else {
  	  	  return num;
  	  	}
  	  }, 0);
  	  this.count = count;
  	  if (count === length || length === 0) {
  	  	return true;
  	  } else {
  	  	return false;
  	  }
  	}
  },
  methods: {
  	addTodos() {
  	  if (this.todos === '') return;
  	  let obj = {
        status: false,
        content: this.todos,
        id: this.id
      }
      this.$http.post('/api/todolist', obj)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '创建成功'
            })
            this.getTodolist()
          } else {
            this.$message.error('创建失败')
          }
        })
        .catch((err) => {
          this.$message.error('创建失败')
          console.log(err)
        })
  	  this.todos = '';
  	},
  	update(index) {
  	  this.$http.put('/api/todolist/' + this.id + '/' + this.list[index].id + '/' + this.list[index].status)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '任务状态更新成功'
            })
            this.getTodolist()
          } else {
            this.$message.error('任务状态更新失败')
          }
        })
  	    .catch((err) => {
          this.$message.error('任务状态更新失败')
        })
  	},
  	remove(index) {
  	  this.$http.delete('/api/todolist/' + this.id + '/' + this.list[index].id)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '任务删除成功'
            })
            this.getTodolist()
          } else {
            this.$message.error('任务删除失败')
          }
        })
        .catch((err) => {
          this.$message.error('任务删除失败')
        })
  	},
    getUserInfo() {
      const token = sessionStorage.getItem('demo-token')
      if (token) {
        return jwt.verify(token,'vue-koa-demo')
      } else {
        return null
      }
    },
    getTodolist() {
      this.$http.get('/api/todolist/' + this.id)
        .then((res) => {
          if (res.status === 200) {
            this.list = res.data
          } else {
            this.$message.error('获取任务列表失败')
          }
        })
        .catch((err) => {
          this.$message.error('获取任务列表失败')
        })
    }
  }
};
</script>

<style scoped>
  .el-input {
  	margin: 20px auto;
  }
  .todo-list {
  	width: 100%;
  	margin-top: 8px;
  	padding-bottom: 8px;
  	border-bottom: 1px solid #eee;
  	overflow: hidden;
  	text-align: left;
  }
  .todo-list .item {
  	font-size: 20px;
  }
  .todo-list .item.completed {
  	text-decoration: line-through;
  	color: #ddd;
  }
  .pull-right {
  	float: right;
  }
</style>