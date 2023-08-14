
import { BrowserWindow } from 'electron'
export function useWindowControl(win: BrowserWindow) {
  const ipcMain = win.webContents.ipc
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
}

