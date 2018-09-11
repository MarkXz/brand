import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// 导入树形table
import vueTable from 'vue-table-with-tree-grid'
// 导入nprogress进度条插件
import Nprogress from 'nprogress'
// 导入nprogress进度条样式
import 'nprogress/nprogress.css'
// 导入字体图标
import '@/assets/fonts/iconfont.css'
// 导入全局样式
import '@/assets/css/global.css'
// 注册树形table组件
Vue.component('tree-table', vueTable)
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios
// 请求拦截器
axios.interceptors.request.use(config => {
  // 显示进度条
  Nprogress.start()
  // 为请求头添加token值
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)
  return config
})
// 响应拦截器
axios.interceptors.response.use(config => {
  Nprogress.done()
  return config
})
Vue.use(ElementUI)
// 时间的全局过滤器
Vue.filter('dataForm', originVal => {
  const data = new Date(originVal)
  const y = data.getFullYear()
  const m = (data.getMonth() + 1 + '').padStart(2, '0')
  const d = (data.getDate() + '').padStart(2, '0')
  const hh = (data.getHours() + '').padStart(2, '0')
  const mm = (data.getMinutes() + '').padStart(2, '0')
  const ss = (data.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
