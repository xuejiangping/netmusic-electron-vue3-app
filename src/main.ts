import router from './router'
import app from './utils/app'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import './directive'  //全局指令
import vue3videoPlay from 'vue3-video-play' // 引入组件

/************************************************/

const pinia = createPinia()

/************************************************/
import $http from './apis/http'
import $common from './assets/js/common';
import $utils from './utils/util.js'



/************************************************/
import './assets/css/global.less'
import 'element-plus/dist/index.css'
import './assets/fonts/fonts.css'
import 'vue3-video-play/dist/style.css' // 引入css



/************************************************/
// window.NetMusic = {
//   $http,
//   init: false
// }
window.document.body.oncontextmenu = () => false

//==========================================================
//  util2 需要用到 store,所以必须，放到createPinia() 调用后异步绑定
//==========================================================

app.config.globalProperties.$store = Object.values(import.meta.glob('./store/*.ts', { eager: true })).reduce((t: object, v) => Object.assign(t, v), {},) as any

import('./utils/util2.js').then($utils2 => {
  app.config.globalProperties.$utils2 = $utils2
})

app.config.globalProperties.$http = $http
app.config.globalProperties.$utils = $utils
app.config.globalProperties['$COMMON'] = $common;
app.config.errorHandler = function (err) { console.log('err', err) }

// window.$http = $http

//*********************************************************** */
app.use(vue3videoPlay)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
/*********************** 工具2*************************/

