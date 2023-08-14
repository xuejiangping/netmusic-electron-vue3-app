
import { RouteRecordRaw, } from 'vue-router'
import views_dir from './views_dir.json'

type RouteLike = Partial<{
  name: string,
  path: string, children: RouteLike[],
  component: Function, redirect: string
}>

const componentsModules = import.meta.glob('@/views/**/*.vue', { import: 'default' })

// console.log('views_dir', views_dir)
//根据 views_dir 生成路由
const generateRoutes = (routesLike: RouteLike[], root = '/src/views') => {
  return routesLike.map(({ name, path, children }) => {
    const $path = `${root}/${name}`
    const componentPath = `${$path}/index.vue`
    const route: RouteLike = {
      name, path,
      component: componentsModules[componentPath]
    }
    if (children) route['children'] = generateRoutes(children, $path)
    return route
  })
}
const c_routes = generateRoutes(views_dir) //二级子路由

c_routes.push({
  path: '',
  name: 'redirect-app-index',
  redirect: 'index'
})

//==========================================================
//
//  之前未考虑全局子弹窗情况，没有做跟路由，所以这里用这种方式补一个根路由，
//   把app 放到  
//
//==========================================================
const routes: RouteLike[] = [
  {
    name: 'app', path: '', children: c_routes, component: () => import('@/App.vue')
  },
  {
    name: 'desklrc', path: '/desklrc', component: () => import('@/views/desklrc/index.vue'),
  }

]
// console.log('a', routes)

export default routes as Readonly<RouteRecordRaw[]> 
