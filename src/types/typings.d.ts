import { ComponentCustomProperties } from "vue";
import { RouteMeta, RouteRaw } from 'vue-router'
import $http from '../apis/http.ts'
import $common from '../assets/js/common.js';
import $utils from '../utils/util.js'

export { }  //
declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof $http; // 这里填类型
    $COMMON: typeof $common
    $message: Function
    $loading: Function
    $alert: Function
    $notify: Function
    $msgbox: Function
    $confirm: Function
    $utils: typeof $utils
  }
}



declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean
    // 每个路由都必须声明
    requiresAuth?: boolean,
    name: string,
    menuOrder: number
  }
  interface RouteRaw {
    name?: string | undefined;
    path: string;
    props?: boolean;
    meta?: RouteMeta;
    component?: () => Promise<unknown>;
    redirect?: string,


  }

}

// 定义全局 和 window
declare global {
  type GetValue<T> = T[keyof T]
  // 索有请求数据的 类型
  type AllProps = Partial<{
    alias: string[]
    name: string,
    img1v1Url: string,
    id: string | number,
    accountId: number,
    trans: string,
    artistName: string,
    artists: { name: string, id: number }[],
    cover: string, duration: number,
    title: string,
    singer: { name: string, id: string | number },
    album: { name: string, id: string | number },
    audioUrl: string,
    userId: string | number,
    trackCount: number,
    bookCount: number,
    playCount: number,
    creator: { id: string | number, name: string },

  }>

}
