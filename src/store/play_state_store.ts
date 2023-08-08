/**************************************************
*
*        管理播放状态
*
 **************************************************/
import $utils from '../utils/util.ts'
import { ElMessage } from 'element-plus'
// console.log(getCurrentInstance()?.proxy!)

type SongId = SongItem['id']
type PlayAciton = 'next' | 'prev'
interface PlayState {
  playList: SongItem[],
  playIndex: number
  isPaused: boolean, // 当前播放状态
  isUpdateCurTime: boolean   //播放进度条是否按下，按下期间歌曲播放不更新进度条
  loopIndex: number,
  audioELcontrol: { play(): void, pause(): void } | null,
  currentSong: SongItem | null,
  userClickPlayActionType: PlayAciton
  includedListIds: string[] // 播放列表包含的歌单的id

}

/***********************循环播放的选项*************************/
enum LoopEnum {
  顺序播放,
  列表循环,
  单曲循环,
  随机播放,
}




export const usePlayStateStore = defineStore('play_state', () => {
  // play_state_store
  const PLAY_STATE_STORE = 'play_state_store'
  const baseOption = {
    isPaused: true, // 当前播放状态
    playList: [], // 播放列表
    playIndex: 0, // 当前播放歌曲在播放列表的所有位置
    // isShowPlayListTips: false, // 添加及播放成功后，播放列表按钮提示的文字
    includedListIds: [],
    isUpdateCurTime: false,
    loopIndex: LoopEnum.顺序播放,
    audioELcontrol: null,
    currentSong: null,
    userClickPlayActionType: 'next'  //用户手动点击的 类型,上一曲或下一曲
  }


  const initializationOption = $utils.localstorage.save_and_load(PLAY_STATE_STORE, () => ({ ...state, isPaused: true }), true) || baseOption
  const state: PlayState = reactive(initializationOption)

  watch(() => state.loopIndex, (_, lastIndex) => {
    if (lastIndex === LoopEnum.随机播放) {
      if (currentSong.value) updatePlayIndex(currentSong.value.id)
    }
  })

  /***********************原列表打乱*************************/
  const shufflePlayList = computed(() => $utils.shuffle(state.playList))


  /***********************改变播放状态*************************/
  function setPauseState(val: boolean) { state.isPaused = val }



  //==========================================================
  //
  //        播放列表控制
  //
  //==========================================================

  const { currentSong } = toRefs(state)

  const curSongId = computed(() => currentSong && currentSong.value?.id || '-1')
  const curPlayingList = computed(() => state.loopIndex === LoopEnum.随机播放 ? shufflePlayList.value : state.playList)
  /***********************判断歌曲是否存在于列表*************************/
  const isExist = (songId: SongId) => state.playList.some(song => song.id === songId)

  /**根据 playIndex 更新播放的音乐 */
  function updateCurSong() {
    state.currentSong = curPlayingList.value[state.playIndex]
  }

  function setLoopIndex(val: LoopEnum) { state.loopIndex = val }

  /**根据 songId 更新playindex */

  function updatePlayIndex(songId: SongId) {
    const index = curPlayingList.value.findIndex(song => song.id === songId)
    if (index < 0) ElMessage({ message: '请先添加歌曲到播放列表', type: 'error' })
    else state.playIndex = index
  }


  function _add(item: SongItem | SongItem[]) {
    const curList = state.playList.slice()
    if (Array.isArray(item)) {
      curList.splice(state.playIndex + 1, 0, ...item)
    } else {
      curList.splice(state.playIndex + 1, 0, item)
    }
    state.playList = [...new Set(curList)]
  }
  /**添加歌单到当前播放列表 */
  function addPlayList(list: SongItem[], listId: string) {

    if (state.includedListIds.includes(listId)) ElMessage({ message: '当前歌单已在播放列表', type: 'error' })
    else _add(list)
  }
  /**添加歌曲到播放列表，可选择立即播放 */
  function addSong(song: SongItem, playNow = false) {
    if (!isExist(song.id)) _add(song)
    if (playNow) play(song.id)

  }


  function clearPlayList() {
    state.playList = []
    state.includedListIds = []
    updateCurSong()
  }

  /**更新当前播放列表 ，并播放歌曲 */
  function updatePlayList(list: SongItem[], songId: SongId, playlistId: string) {
    state.playList = list
    state.includedListIds = [playlistId]
    play(songId)
  }
  /***********************播放歌曲 songId*********************/
  function play(songId: SongId) {
    if (currentSong && songId === currentSong.value?.id) ElMessage({ message: '正在播放该歌曲', type: 'info' })
    else {
      updatePlayIndex(songId)
      updateCurSong()
    }
  }
  //更改 是否更新播放时间
  function setIsUpdateCurTime(val: boolean) {
    state.isUpdateCurTime = val
  }
  /***********************播放完当前歌曲后,后续逻辑*************************/
  function continuePlay() {
    switch (state.loopIndex) {
      case LoopEnum.顺序播放:
        if (state.playIndex < state.playList.length - 1) next()
        break;
      case LoopEnum.单曲循环:
        state.audioELcontrol?.play()
        break;
      default:
        next();
    }
  }

  function changeUserClickPlayActionType(val: PlayAciton) {
    state.userClickPlayActionType = val
  }
  /**下一曲 */
  function next() {

    if (state.playIndex === state.playList.length - 1) {
      state.playIndex = 0
    } else {
      state.playIndex++
    }
    updateCurSong()
    // state.audioELcontrol?.play()
  }
  /**上一曲 */
  function prev() {
    if (state.playIndex === 0) {
      state.playIndex = state.playList.length - 1
    } else {
      state.playIndex--
    }
    updateCurSong()
  }
  //==========================================================
  //       初始化音频元素的控制 
  //==========================================================
  function initAudioELcontrol(val: PlayState['audioELcontrol']) { state.audioELcontrol = val }

  /**************************************************
  *        绑定托盘 控制 播放功能*
   **************************************************/
  if (window.app_control) {
    const { tray_setContextMenu_musicName, tray_setToolTip, ipcRenderer_event_bind } = window.app_control

    ipcRenderer_event_bind('playMusic', () => state.isPaused ? state.audioELcontrol?.play() : state.audioELcontrol?.pause())
    ipcRenderer_event_bind('nextMusic', next)
    ipcRenderer_event_bind('prevMusic', prev)

    watchEffect(() => {
      if (state.currentSong) {
        const { name, artists } = state.currentSong
        const info = `${name} - ${artists[0].name}`
        tray_setContextMenu_musicName(info)
        tray_setToolTip(info)
      }
    })
  }




  return {
    ...toRefs(state),
    changeUserClickPlayActionType, continuePlay,
    clearPlayList, curSongId, initAudioELcontrol,
    setPauseState, next, prev, addSong, updatePlayList, addPlayList,
    currentSong, play, setIsUpdateCurTime, setLoopIndex
  }
})