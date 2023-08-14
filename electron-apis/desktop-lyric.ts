//==========================================================
//
//        桌面歌词
//
//==========================================================
import { ipcMain, BrowserWindow, globalShortcut } from 'electron'
import path from 'path'
export function useDesktopLyric(win: BrowserWindow) {
  let desktop_lyric_win: BrowserWindow

  ipcMain.handle('desktop_lyric', (_, info: { type: 'open' | 'close' | 'data', path?: string, data?: any }) => {

    if (info.type === 'open') {
      let root_path = process.env.VITE_DEV_SERVER_URL || path.join(__dirname, '../dist-electron/index.html')
      desktop_lyric_win = new BrowserWindow({
        width: 600, height: 200,
        parent: win || BrowserWindow.getFocusedWindow() || undefined,
        transparent: true, frame: false, resizable: true, maxHeight: 250, minWidth: 300, minHeight: 150,
        alwaysOnTop: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
      })

      desktop_lyric_win.loadURL(root_path + info.path)
      desktop_lyric_win.webContents.ipc.handle('close', () => {
        win.webContents.send('desktop-lyric-close')  //这里不直接  desktop_lyric_win.close() 关闭窗口，需要通知主渲染线程 事件，触发下面的close 事件来关闭，
      })
      desktop_lyric_win.on('always-on-top-changed', (e) => e.preventDefault())

      globalShortcut.register('CommandOrControl+Shift+j', function () {
        desktop_lyric_win.webContents.openDevTools({ 'activate': true, mode: 'undocked' })
      })
    } else if (info.type === 'data') {
      desktop_lyric_win?.webContents.send('lyric_data', JSON.stringify(info.data))
    } else if (info.type === 'close') {
      desktop_lyric_win?.close()
      globalShortcut.unregister('CommandOrControl+Shift+j')

    }

  })
}


