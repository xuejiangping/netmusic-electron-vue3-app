/**************************************************
*
*        管理播放状态
*
 **************************************************/
import $utils from '../utils/util.ts'
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


/***********************循环的选项*************************/
enum LoopEnum {
  顺序播放,
  列表循环,
  单曲循环,
  随机播放,
}
const loopOptions = [
  {
    index: LoopEnum.顺序播放,
    icon: 'iconfont icon-playsong',
    title: LoopEnum[LoopEnum.顺序播放]
  },
  {
    index: LoopEnum.列表循环,
    icon: 'iconfont icon-loop',
    title: LoopEnum[LoopEnum.列表循环]
  },
  {
    index: LoopEnum.单曲循环,
    icon: 'iconfont icon-single-cycle',
    title: LoopEnum[LoopEnum.单曲循环]
  },
  {
    index: LoopEnum.随机播放,
    icon: 'iconfont icon-shuffle',
    title: LoopEnum[LoopEnum.随机播放]
  }
]



export const usePlayStateStore = defineStore('play_state', () => {
  // play_state_store
  const PLAY_STATE_STORE = 'play_state_store'


  const state: PlayState = reactive($utils.localstorage.save_and_load(PLAY_STATE_STORE,
    () => ({ ...state, isPaused: true }), window.NetMusic.init) || {
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
  })


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
  //        循环模式 功能
  //
  //==========================================================
  const currentLoopOption = computed(() => loopOptions[state.loopIndex])
  function switchLoopOption() {
    if (state.loopIndex === loopOptions.length - 1) {
      state.loopIndex = 0
    } else state.loopIndex++

  }

  //==========================================================
  //
  //        播放列表控制
  //
  //==========================================================

  const { currentSong } = toRefs(state)

  const curSongId = computed(() => currentSong && currentSong.value?.id || '-1')
  const curPlayingList = computed(() => currentLoopOption.value.index === LoopEnum.随机播放 ? shufflePlayList.value : state.playList)
  /***********************判断歌曲是否存在于列表*************************/
  const isExist = (songId: SongId) => state.playList.some(item => item.id === songId)

  /**根据 playIndex 更新播放的音乐 */
  function updateCurSong() {
    state.currentSong = curPlayingList.value[state.playIndex]
  }

  /**根据 songId 更新playindex */

  function updatePlayIndex(songId: SongId) {
    const index = curPlayingList.value.findIndex(song => song.id === songId)
    if (index < 0) console.error('请先添加歌曲到播放列表')
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
    if (state.includedListIds.includes(listId)) return console.log(123)
    _add(list)
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
    if (currentSong && songId === currentSong.value?.id) return console.log('正在播放该歌曲', songId)
    updatePlayIndex(songId)
    updateCurSong()
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
  //
  //       获取 音频元素的控制 
  //
  //==========================================================
  function initAudioELcontrol(val: PlayState['audioELcontrol']) { state.audioELcontrol = val }
  /***********************绑定托盘播放功能*************************/
  if (window.app_control) {
    const { tray_setContextMenu_musicName, tray_setToolTip, tray_menuitem_event_bind } = window.app_control

    tray_menuitem_event_bind('playMusic', () => state.isPaused ? state.audioELcontrol?.play() : state.audioELcontrol?.pause())
    tray_menuitem_event_bind('nextMusic', next)
    tray_menuitem_event_bind('prevMusic', prev)

    watch(() => state.currentSong, (song) => {
      if (song) {
        const info = `${song.name} - ${song.artists[0].name}`
        tray_setContextMenu_musicName(info)
        tray_setToolTip(info)
      }
    })
  }




  return {
    ...toRefs(state), changeUserClickPlayActionType, continuePlay, clearPlayList, curSongId, currentLoopOption, initAudioELcontrol, switchLoopOption, setPauseState, next, prev, addSong, updatePlayList, addPlayList, currentSong, play, setIsUpdateCurTime
  }
})