
import { ipcMain, BrowserWindow, Tray, Menu, MenuItemConstructorOptions } from 'electron'
const path = require('path');
function createTray(win: BrowserWindow) {
  // 创建系统托盘
  const tray = new Tray(path.join(__dirname, '../src/assets/img/favicon.ico')); // 用来存放系统托盘
  // 菜单模板
  const menu_template: MenuItemConstructorOptions[] = [
    {
      label: '当前歌曲',
      click() {
        win.webContents.send('music_detail')
      }
    },
    {
      label: '播放/暂停',
      click() {
        win.webContents.send('playMusic')
      }

    },
    {
      label: '上一曲',
      click() {
        win.webContents.send('prevMusic')
      }

    },
    {
      label: '下一曲',
      click() {
        win.webContents.send('nextMusic')
      }

    },
    {
      label: '退出',
      click() { win.close() }
    }
  ]

  // 构建菜单
  const menu = Menu.buildFromTemplate(menu_template);
  // 给系统托盘设置菜单
  tray.setContextMenu(menu);
  // 给托盘图标设置气球提示
  tray.setToolTip('浮生浪迹笑明月');
  // 托盘图标单击
  tray.on('click', () => win.show());
  return { tray, menu }
}

/***********************app 窗口控制*************************/
export function create_app_apis(win: BrowserWindow) {
  const { tray, menu } = createTray(win)

  ipcMain.handle('window_close', () => win.close())
  ipcMain.handle('window_min', () => win.minimize())
  ipcMain.handle('window_hide', () => win.hide())

  ipcMain.handle('window_max', () => {
    if (win.isMaximized()) win.restore()
    else win.maximize()
  })


  ipcMain.handle('tray_setContextMenu_musicName', (_, musicName: string) => {
    menu.items[0].label = musicName
    tray.setContextMenu(menu)
  })
  ipcMain.handle('tray_setToolTip', (_, title: string) => {
    tray.setToolTip(title)
  })

}