
import { BrowserWindow } from 'electron'
import { userTray } from './tray'
import { useDesktopLyric } from './desktop-lyric'
import { useWindowControl } from './window-control'

/***********************api *************************/
export function create_app_apis(win: BrowserWindow) {


  //==========================================================
  //       系统托盘
  //==========================================================

  userTray(win)
  //==========================================================
  //        桌面歌词
  //==========================================================
  useDesktopLyric(win)
  /***********************窗口控制*************************/
  useWindowControl(win)

}