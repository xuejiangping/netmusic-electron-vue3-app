/**************************************************
*
*        ipcMain 主进程 
*
 **************************************************/
import { app, BrowserWindow, Menu, globalShortcut, ipcMain } from 'electron'
import path from 'path'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const createWin = () => {
  Menu.setApplicationMenu(null)

  const win = new BrowserWindow({
    width: 800, height: 560,
    minWidth: 650,
    minHeight: 450,
    frame: false, //去掉 边框
    // skipTaskbar: true,
    title: '网易云音乐',
    // transparent: true,
    // autoHideMenuBar: true, //隐藏菜单
    webPreferences: {
      contextIsolation: false, // 防止同时创建多个页面的同时窗口引起的死锁 （DevTools activelty on by default
      nodeIntegration: true, // 允许使用任何外部访问控制语言的Node.js API。这意味着如  
      preload: path.join(__dirname, '../electron-preload/index.ts') // 在脚本文件中加载插件时可以省略该文件
    }
  })
  // win.webContents.openDevTools
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(path.join(__dirname, '../index.html')))
  } else {
    const url = 'http://localhost:5173/'
    win.loadURL(process.env.VITE_DEV_SERVER_URL || url) // If you want to test on a real device you should use this URL. Learn more about that at https://codege
  }
  return win
}
app.whenReady().then(() => {
  const win = createWin()


  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools()
  })
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWin();
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }
})

// 关闭窗口
app.on('window-all-closed', () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});