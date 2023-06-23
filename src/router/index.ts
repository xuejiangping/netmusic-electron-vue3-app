import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

import 'vue-router'

declare namespace aa {
  const a = 1
  const b = 2
  const c = 999

}




const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router