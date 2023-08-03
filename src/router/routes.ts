
import { RouteRecordRaw, } from 'vue-router'
import views_dir from './views_dir.json'
const componentsModules = import.meta.glob('@/views/**/*.vue', { import: 'default' })

type RouteLike = Partial<{
  name: string,
  path: string, children: RouteLike[],
  component: Function, redirect: string
}>

console.log('views_dir', views_dir)
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
const routes = generateRoutes(views_dir)

routes.push({
  path: `/`,
  redirect: '/index'
})

console.log('routes', routes)



export default routes as Readonly<RouteRecordRaw[]> 