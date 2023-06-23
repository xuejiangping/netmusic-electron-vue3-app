import router from './router'
import app from './utils/app'
import $utils from './utils/util.js'

import ElementPlus from 'element-plus'
import $http from './apis/http'
import common from './assets/js/common';
// import routes from './router/routes.ts'
// import createViewsDir from './utils/createViewsDir.ts'

//css
import './assets/css/global.less'
import 'element-plus/dist/index.css'
import './assets/fonts/fonts.css'

// 生成 路由目录文件



app.config.globalProperties.$http = $http
app.config.globalProperties.$utils = $utils



app.config.globalProperties['$COMMON'] = common;
app.use(router).use(ElementPlus).mount('#app')
