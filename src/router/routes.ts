
import { RouteRecordRaw, RouteRaw } from 'vue-router'


const pageModules: Record<string, { name: string, menuOrder: number }> = import.meta.glob('@/views/**/*.ts', { import: 'default', eager: true })

const componentsModules = import.meta.glob('@/views/**/*.vue', { import: 'default' })

// console.log('pageModules', pageModules)
// console.log('componentsModules', componentsModules)

// type A =({ children:A}) extends RouteRecordRaw[]

const routes: RouteRaw[] = Object.entries(pageModules)
  .map(([pagePath, config]) => {
    const componentPath = pagePath.replace('page.ts', 'index.vue')
    return {
      name: config.name,
      path: `/${String(config.name)}`,
      // props: true,
      meta: config,
      component: componentsModules[componentPath],
    }
  })
routes.push({
  path: `/`,
  redirect: '/index'
})
console.log('routes', routes)


// const routes: Readonly<RouteRecordRaw[]> = [
//   {
//     name: 'search',
//     path: '/search',
//     component: () => import('@/views/search/index12313.vue'),
//     props: true,// Just a simple search box. 描述了变量名称
//     meta: {}
//   },
//   {
//     name: 'playlist',
//     path: '/playlist',
//     component: () => import('@/views/playlist/index.vue'),
//     props: true
//   },
//   {
//     name: 'mvlist',
//     path: '/mvlist',
//     component: () => import('@/views/playlist/index.vue'),
//     props: true
//   },
//   {
//     name: 'rank',
//     path: '/rank',
//     component: () => import('@/views/playlist/index.vue'),
//     props: true
//   },
//   {
//     name: 'artist',
//     path: '/artist',
//     component: () => import('@/views/playlist/index.vue'),
//     props: true
//   }
// ]

export default routes as Readonly<RouteRecordRaw[]> 