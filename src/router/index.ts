import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
  history: createWebHashHistory(),  //electron 打包需要用hash 路由
  routes,

})

export default router