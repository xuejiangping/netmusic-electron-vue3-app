/**************************************************
*
*       ipcRenderer 渲染进程
*
 **************************************************/


const { ipcRenderer, contextBridge } = require('electron')

// contextBridge.exposeInMainWorld('app_control', {
//   window_control(...args: any) { ipcRenderer.invoke('window_control', ...args) },
//   tray_setToolTip(...args: any[]) { ipcRenderer.invoke('tray_setToolTip', ...args) },
//   tray_setContextMenu_musicName(...args: any[]) { ipcRenderer.invoke('tray_setContextMenu_musicName', ...args) },
//   tray_menuitem_event_bind(...args: [any, any]) { ipcRenderer.on(...args) },
//   desktop_lyric(...args: any[]) { return ipcRenderer.invoke('desktop_lyric', ...args) }
// })

window.app_control = {
  // ipcRenderer,
  window_control(...args) { ipcRenderer.invoke('window_control', ...args) },
  tray_setToolTip(...args) { ipcRenderer.invoke('tray_setToolTip', ...args) },
  tray_setContextMenu_musicName(...args) { ipcRenderer.invoke('tray_setContextMenu_musicName', ...args) },
  tray_menuitem_event_bind(...args) { ipcRenderer.on(...args) },
  desktop_lyric(...args) { return ipcRenderer.invoke('desktop_lyric', ...args) }
}