import { ComponentCustomProperties } from "vue";
import { RouteMeta, RouteRaw } from 'vue-router'
import $http from '../apis/http.ts'
import $common from '../assets/js/common.js';
import $utils, { formatSongInfo } from '../utils/util.js'

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
  type SongRecord = ReturnType<typeof formatSongInfo>
  type GetValue<T> = T[keyof T]

}
