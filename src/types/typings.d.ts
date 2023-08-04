// import { ComponentCustomProperties } from "vue";
// import { RouteMeta, RouteRaw } from 'vue-router'
import $http from '../apis/http.ts'
import $common from '../assets/js/common.js';
import $utils from '../utils/util.js'
import * as $utils2 from '../utils/util2.js'
import $store from '../store'
import { IpcRendererEvent } from 'electron/renderer';
import { IpcRenderer } from 'electron';
// import second from '../../electron-preload/index.ts'
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
    $store: typeof $store
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
  album: AlbumItem,
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





type Tray_MenuItem_EventName = 'music_detail' | 'playMusic' | 'prevMusic' | 'nextMusic'

// 定义全局 和 window
declare global {
  type ListType = 'singer' | 'playlist' | 'video' | 'album' | 'song'

  interface BaseProps { name: string, id: string }
  type SomePartial<T, U extends keyof T> = Partial<Pick<T, U>> & Omit<T, U>
  type GetValue<T> = T[keyof T]
  type SongItem = Pick<AllProps, 'mv' | 'ratio' | 'name' | 'id' | 'artists' | 'album' | 'duration' | 'dt' | 'audioUrl'>
  type AlbumItem = Pick<AllProps, 'songs' | 'name' | 'cover' | 'alias' | 'id' | 'artists' | 'publishTime' | 'description'>
  type PlaylistItem = Pick<AllProps, 'description' | 'createTime' | 'avatar' | 'name' | 'trackCount' | 'artistName' | 'artistId' | 'id' | 'playCount' | 'cover'>
  type VideoItem = Pick<AllProps, 'artistName' | 'name' | 'artists' | 'cover' | 'duration' | 'playCount' | 'id' | 'artistId'>
  type SingerItem = Pick<AllProps, 'hotAlbums' | 'musicSize' | 'albumSize' | 'alias' | 'accountId' | 'id' | 'cover' | 'name' | 'trans'>
  type MvItem = Pick<AllProps, 'artistName' | 'duration' | 'playCount' | 'cover' | 'publishTime' | 'name' | 'id'>
  type Window_Control_Type = 'close' | 'min' | 'max' | 'hide'





  namespace DeskLyric {
    type LyricData = { time: number, txt: string }
    type DeskLrcData = {
      lyric: LyricData
    }
    type EventType = 'data' | 'close' | 'open'
  }


  /***********************添加新属性到window*************************/
  interface Window {

    app_control: {
      ipcRenderer?: IpcRenderer
      window_control(info: { type: Window_Control_Type }): void
      tray_setToolTip(title: string): void
      tray_setContextMenu_musicName(info: string): void
      tray_menuitem_event_bind(eventName: Tray_MenuItem_EventName, handler: (...args: any[]) => void): void
      desktop_lyric(option: { type: 'open', path: string }): Promise<any>
      desktop_lyric(option: { type: 'data', data: DeskLyric.DeskLrcData }): Promise<any>
      desktop_lyric(option: { type: 'close' }): Promise<any>

    }
  }
}

