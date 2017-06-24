<template>
  <el-row class="content">
  	<el-col :xs="24" :sm="{span: 6, offset: 9}">
  	  <span class="title">
  	  	登录
  	  </span>
  	  <el-row>
  	  	<el-input
  	  	  v-model="name"
  	  	  placeholder="账号"
  	  	  type="text">
		</el-input>
		<el-input
		  v-model="password"
		  placeholder="密码"
		  type="password"
      @keyup.enter.native = "loginTodo">
		 </el-input>
		 <el-button type="primary" @click="loginTodo">登录</el-button>
  	  </el-row>
  	</el-col>
  </el-row>
</template>

<script>
  export default {
  	data() {
  	  return {
  	  	name: '',
  	  	password: ''
  	  }
  	},
    methods: {
      loginTodo() {
        let obj = {
          name: this.name,
          password: this.password
        }
        this.$http.post('/auth/user', obj)
          .then((res) => {
            if (res.data.success) {
              sessionStorage.setItem('demo-token', res.data.token)
              this.$message({
                type: 'success',
                message: '登录成功!'
              })
              this.$router.push('/todolist')
            } else {
              this.$message.error(res.data.info)
              sessionStorage.setItem('demo-token', null)
            }
          }, (err) => {
            this.$message.error('请求错误')
            sessionStorage.setItem('demo-token', null)
          })
      }
    }
  }
</script>

<style scoped>
  .el-row.content {
  	padding: 16px;
  }
  .title {
  	font-size: 28px;
  }
  .el-input {
  	margin: 12px 0;
  }
  .el-button {
  	width: 100%;
  	margin-top: 12px;
  }
</style>