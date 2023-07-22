import { ComponentCustomProperties } from "vue";
import { RouteMeta, RouteRaw } from 'vue-router'

import $http from '../apis/http.ts'
import $common from '../assets/js/common.js';
import $utils from '../utils/util.js'
import * as $utils2 from '../utils/util2.js'


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
    $utils2: typeof $utils2
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

/**所有关于 音乐数据的 类型 */
interface BaseProps { name: string, id: string }
/**
 * 说明：dt 是歌曲 原时间，单位 ms;
 * duration 是dt经过 formatSongTime 函数格式化后的字符,格式如：02：34;
 */
interface AllProps extends BaseProps {
  alias: string[],
  artistId: string,
  img1v1Url: string,
  mv: string,
  accountId: string,
  trans: string,
  artistName: string,
  artists: BaseProps[],
  cover: string,
  duration: string,
  dt: number,
  title: string,
  singer: BaseProps,
  album: BaseProps & { picUrl: string },
  audioUrl: string,
  userId: string,
  trackCount: number,
  bookCount: number,
  playCount: number,
  creator: BaseProps,
  ratio?: string,
  hotAlbums: AlbumItem[],
  albumSize: number,
  musicSize: number,
  songs: SongItem[],
  avatar: string
  createTime: string,
  description: string,
  publishTime: string
}



// 定义全局 和 window
declare global {
  type VideoTabelType = 'singer' | 'playlist' | 'video' | 'album'

  interface BaseProps { name: string, id: string }
  type SomePartial<T, U extends keyof T> = Partial<Pick<T, U>> & Omit<T, U>
  type GetValue<T> = T[keyof T]
  type SongItem = Pick<AllProps, 'mv' | 'ratio' | 'name' | 'id' | 'artists' | 'album' | 'duration' | 'dt' | 'audioUrl'>
  type AlbumItem = Pick<AllProps, 'songs' | 'name' | 'cover' | 'alias' | 'id' | 'artists' | 'publishTime' | 'description'>
  type PlaylistItem = Pick<AllProps, 'description' | 'createTime' | 'avatar' | 'name' | 'trackCount' | 'artistName' | 'artistId' | 'id' | 'playCount' | 'cover'>
  type VideoItem = Pick<AllProps, 'artistName' | 'name' | 'artists' | 'cover' | 'duration' | 'playCount' | 'id' | 'artistId'>
  type SingerItem = Pick<AllProps, 'hotAlbums' | 'musicSize' | 'albumSize' | 'alias' | 'accountId' | 'id' | 'cover' | 'name' | 'trans'>
  type MvItem = Pick<AllProps, 'artistName' | 'duration' | 'playCount' | 'cover' | 'publishTime' | 'name' | 'id'>


}
