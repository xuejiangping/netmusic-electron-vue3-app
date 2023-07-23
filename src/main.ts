import router from './router'
import app from './utils/app'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
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
window.NetMusic = {
  $http,
  init: false
}
window.document.body.oncontextmenu = () => false

//==========================================================
//        util2 需要用到 store,所以必须，放到createPinia() 调用后异步绑定
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
// 给元素自动添加title
app.directive('title', (el: HTMLElement) => {
  el.title = el.textContent!
  el.classList.add('text-in-oneline')
})
/**  利用 IntersectionObserver 实现无限滚动 */
app.directive('my-infinite-scroll', {
  mounted(el: HTMLElement & { ob: IntersectionObserver }, binding) {
    const footerEl = document.createElement('div')
    // footerEl.style.height = '10rem'
    const getmoreFN = binding.value
    el.parentElement?.appendChild(footerEl)
    const ob = el.ob = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
        getmoreFN()()
      }
    })
    ob.observe(footerEl)

  },
  unmounted(el) {
    const ob = el.ob as IntersectionObserver
    ob.disconnect()
  }
})
app.directive('topN', (el: HTMLElement, { value }) => value[0] < value[1] && (el.style.color = 'red'))

//*********************************************************** */
/************************************************/
app.use(vue3videoPlay)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
/*********************** 工具2*************************/

