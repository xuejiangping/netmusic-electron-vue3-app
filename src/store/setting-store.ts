
import { ElAlert, ElMessage } from 'element-plus'
const SETTING_STORE = 'setting-store'

const baseOption = {
  panel: {
    label: '关闭面板',
    option: [
      { text: '最小化到系统托盘', index: 'hide' },
      { text: '退出app', index: 'exit' }
    ],
    type: 'radio',
    val: 'hide' as 'hide' | 'exit'
  },
  dbclick_playlist: {
    label: '双击播放列表时',
    option: [
      { text: '双击播放列表时，用当前单曲所在歌曲列表替换播放列表', index: 'updatePlaylist' },
      { text: '双击播放列表时，仅把当前单曲添加到播放列表', index: 'addSong' }

    ],
    type: 'radio',
    val: 'addSong' as 'addSong' | 'updatePlaylist'

  },
  play_progress: {
    label: '播放进度',
    option: [{ text: '记住上一次播放进度', index: 'remember' }],
    type: 'check',
    val: ['remember'] as ['remember']

  },
  autoplay: {
    label: '自动播放',
    option: [{ text: '启动时自动播放上次的音乐', index: 'autoplay' }],
    type: 'check',
    val: ['autoplay'] as ['autoplay']
  }
}


const initialization = JSON.parse(window.localStorage.getItem(SETTING_STORE) || 'null') || baseOption
const setting: typeof baseOption = reactive(initialization)

watch(setting, (val) => {
  window.localStorage.setItem(SETTING_STORE, JSON.stringify(val))
  ElMessage({ 'message': '设置已更新', type: 'success' })
}, { 'deep': true })


export function useSettingStore() { return setting } 