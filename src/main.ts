import router from './router'
import app from './utils/app'
import $utils from './utils/util.js'

import ElementPlus from 'element-plus'
import $http from './apis/http'
import common from './assets/js/common';


//**********************css*********************************
import './assets/css/global.less'
import 'element-plus/dist/index.css'
import './assets/fonts/fonts.css'



//*********************全局属性********************************* */
app.config.globalProperties.$http = $http
app.config.globalProperties.$utils = $utils


/*******************全局指令********************************** */
// 使用自定分割符 分割多个元素
app.directive('split', (el: HTMLElement, { value }) => {
  const [i, separator] = value
  if (i > 0) el.prepend(document.createTextNode(separator))
})

//*********************************************************** */
app.config.globalProperties['$COMMON'] = common;
app.use(router).use(ElementPlus).mount('#app')
