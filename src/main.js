import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// 导入字体图标
import '@/assets/fonts/iconfont.css'
// 导入全局样式
import '@/assets/css/global.css'
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
