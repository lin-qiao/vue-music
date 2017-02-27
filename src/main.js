// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'
import router from './router'
import store from './store'

Vue.use(vueResource)

require('./assets/css/style.css')
require('./assets/css/animate.css')
require('./assets/js/base64.js')
require('./assets/js/lib-flexble.js')


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
