
import { ipcMain, BrowserWindow } from 'electron'
import { createTray } from './tray'
/***********************api *************************/
export function create_app_apis(win: BrowserWindow) {
  const { menu_template_ref, toolTip } = createTray(win)
  ipcMain.handle('window_close', () => win.close())
  ipcMain.handle('window_min', () => win.minimize())
  ipcMain.handle('window_hide', () => win.hide())

  ipcMain.handle('window_max', () => {
    if (win.isMaximized()) win.restore()
    else win.maximize()
  })

  ipcMain.handle('tray_setContextMenu_musicName', (_, info: string) => {
    menu_template_ref.value[0].label = info
  })
  ipcMain.handle('tray_setToolTip', (_, title: string) => {
    toolTip.value = title
  })

}