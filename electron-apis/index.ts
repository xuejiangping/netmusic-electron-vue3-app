
import { ipcMain, BrowserWindow } from 'electron'
import { createTray } from './tray'
import { ref, watchEffect } from 'vue'
import path from 'path'
/***********************api *************************/
export function create_app_apis(win: BrowserWindow) {
  const { menu_template_ref, toolTip } = createTray(win)

  ipcMain.handle('window_control', (_, info: { type: Window_Control_Type }) => {
    switch (info.type) {
      case 'close':
        win.close()
        break
      case 'min':
        win.minimize()
        break
      case 'max':
        if (win.isMaximized()) win.restore()
        else win.maximize()
        break
      case 'hide':
        win.hide()
        break
    }

  })


  ipcMain.handle('tray_setContextMenu_musicName', (_, info: string) => {
    menu_template_ref.value[0].label = info
  })
  ipcMain.handle('tray_setToolTip', (_, title: string) => {
    toolTip.value = title
  })




  let desktop_lyric_win: BrowserWindow

  ipcMain.handle('desktop_lyric', (_, info: { type: 'open' | 'close' | 'data', path?: string, data?: any }) => {

    if (info.type === 'open') {
      let root_path = process.env.VITE_DEV_SERVER_URL || path.join(__dirname, '../dist-electron/index.html')
      desktop_lyric_win = new BrowserWindow({
        width: 600, height: 200, parent: BrowserWindow.getFocusedWindow() || undefined,
        transparent: true, frame: false, resizable: true, maxHeight: 250, minWidth: 300, minHeight: 150,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      })

      // desktop_lyric_win.webContents.on('ipc-message')

      // desktop_lyric_win.webContents.openDevTools()
      // console.log('root_path', root_path)
      desktop_lyric_win.loadURL(root_path + info.path)

    } else if (info.type === 'data') {
      desktop_lyric_win?.webContents.send('lyric_data', JSON.stringify(info.data))
    } else if (info.type === 'close') {
      desktop_lyric_win?.close()
    }

  })


}