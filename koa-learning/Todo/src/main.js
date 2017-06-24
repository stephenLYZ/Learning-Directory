// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from 'axios';
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import router from './router';

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')
  if (to.path === '/') {
  	if (token) {
  	  next('/todolist')
  	}
  	next()
  } else {
  	if (token) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  	  next()
  	} else {
  	  next('/')
  	}
  }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

