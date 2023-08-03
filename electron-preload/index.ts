/**************************************************
*
*       ipcRenderer 渲染进程
*
 **************************************************/


const { ipcRenderer } = require('electron')

// global.version=process.version
// contextBridge.exposeInMainWorld('app_window_control', )
// contextBridge.exposeInIsolatedWorld

window.app_control = {
  window_close() { ipcRenderer.invoke('window_close') },
  window_min() { ipcRenderer.invoke('window_min') },
  window_max() { ipcRenderer.invoke('window_max') },
  window_hide() { ipcRenderer.invoke('window_hide') },
  tray_setToolTip(...args) { ipcRenderer.invoke('tray_setToolTip', ...args) },
  tray_setContextMenu_musicName(...args) { ipcRenderer.invoke('tray_setContextMenu_musicName', ...args) },
  tray_menuitem_event_bind(...args) { ipcRenderer.on(...args) }
}
