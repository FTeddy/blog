// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index.js'

Vue.config.productionTip = false
let url = 'https://blog.teddydevstack.com/'
let localhost = 'http://localhost:3000/'
Vue.prototype.baseAxios = axios.create({
  baseURL: url
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
