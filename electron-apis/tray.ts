import { BrowserWindow, Tray, Menu, MenuItemConstructorOptions } from 'electron'
import { ref, watchEffect } from 'vue'
const path = require('path');
export function createTray(win: BrowserWindow) {
  // 创建系统托盘
  const tray = new Tray(path.join(__dirname, '../src/assets/img/favicon.ico')); // 用来存放系统托盘
  // 菜单模板
  const menu_template: MenuItemConstructorOptions[] = [
    {
      label: 'xue6474',
      id: 'curSong',
      click() {
        if (!win.isVisible()) win.show()
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

  const menu_template_ref = ref(menu_template)
  const toolTip = ref('浮生浪迹笑明月')

  watchEffect(() => {
    // 构建菜单
    const menu = Menu.buildFromTemplate(menu_template_ref.value);
    // 给系统托盘设置菜单
    tray.setContextMenu(menu);
  })
  watchEffect(() => tray.setToolTip(toolTip.value))
  // 给托盘图标设置气球提示

  // 托盘图标单击
  tray.on('click', () => win.show());
  return { tray, menu_template_ref, toolTip }
}