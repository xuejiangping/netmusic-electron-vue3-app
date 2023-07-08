import router from './router'
import app from './utils/app'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import vue3videoPlay from 'vue3-video-play' // 引入组件
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
app.config.globalProperties.$http = $http
app.config.globalProperties.$utils = $utils

// window.$http = $http
/***********************全局指令*************************/
// 使用自定分割符 分割多个元素
app.directive('split', (el: HTMLElement, { value }) => {
  let [i, separator] = value
  if (!separator) separator = ' / '
  if (i > 0 && !el.textContent?.includes(separator)) {
    const span = document.createElement('span')
    span.classList.add('separator')
    span.textContent = separator
    el.prepend(span)
  }
})


app.directive('my-infinite-scroll', (el: HTMLElement, { value }) => {
  const pEl = el.parentElement
  if (!pEl) return false
  const cb: CallableFunction = value
  const range = 1   //判断的误差
  /**节流处理过的 滚动事件函数 */
  const handler = () => {
    //是否到底
    let is_bottom: boolean = Math.abs(pEl.scrollHeight - pEl.clientHeight - pEl.scrollTop) < range
    if (is_bottom) cb()
  }
  const debouncedHandler = $utils.debounce(handler, 500)
  pEl.addEventListener('scroll', debouncedHandler)
})
/************************************************/
const pinia = createPinia()
//*********************************************************** */
app.config.globalProperties['$COMMON'] = $common;
/************************************************/
app.use(vue3videoPlay)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')
