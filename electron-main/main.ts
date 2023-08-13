/**************************************************
*
*        ipcMain 主进程 
*
 **************************************************/
import { app, BrowserWindow, Menu, globalShortcut } from 'electron'
import path from 'path'
import { create_app_apis } from '../electron-apis'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const createWin = () => {
  Menu.setApplicationMenu(null)

  const win = new BrowserWindow({
    width: 800, height: 560,
    minWidth: 760,
    minHeight: 550,
    frame: false, //去掉 边框
    // skipTaskbar: true,
    title: '网易云音乐',

    // transparent: true,
    // autoHideMenuBar: true, //隐藏菜单
    webPreferences: {
      // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本.默认为 true
      contextIsolation: false,
      nodeIntegration: false, // 允许使用任何外部访问控制语言的Node.js 
      preload: path.join(__dirname, '../electron-preload/index.ts'),
      // 跨域同源策略
      webSecurity: false
    }
  })
  // win.webContents.openDevTools
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    // win.loadFile(path.join(__dirname, '../index.html'))
    win.loadFile(path.join(__dirname, '../dist/index.html'))

  } else {
    const url = 'http://localhost:5173/'
    win.loadURL(process.env.VITE_DEV_SERVER_URL || url) // If you want to test on a real device you should use this URL. Learn more about that at https://codege
  }
  // win.loadFile(path.join(__dirname, '../index.html'))


  return win
}
/***********************设置左上角菜单*************************/
// Menu.setApplicationMenu(menu)

//*************************************************
app.whenReady().then(() => {
  const win = createWin()

  /***********************快捷键*************************/
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools()
  })
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWin();
  });

  /************************************************/
  create_app_apis(win)
})


// 关闭窗口
app.on('window-all-closed', () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});