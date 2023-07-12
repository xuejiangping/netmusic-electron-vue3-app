/**************************************************
*
*
*        管理播放状态
*
*
 **************************************************/
type SongId = SongItem['id']
interface PlayState {
  stateId: string,    //当前列表的唯一id，用于区别新列表，一般用歌单id，或者专辑id等唯一值
  playList: SongItem[],
  curSongId: string,
  playIndex: number
  isPaused: boolean, // 当前播放状态
  isUpdateCurTime: boolean   //播放进度条是否按下，按下期间歌曲播放不更新进度条
  loopIndex: number
}



/***********************循环的选项*************************/
enum LoopEnum {
  随机播放,
  单曲循环,
  列表循环,
}
const loopOptions = [
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

export default defineStore('play_state', () => {

  const state = reactive<PlayState>({
    isPaused: true, // 当前播放状态
    playList: [], // 播放列表
    playIndex: 0, // 当前播放歌曲在播放列表的所有位置
    // isShowPlayListTips: false, // 添加及播放成功后，播放列表按钮提示的文字
    curSongId: '0',
    stateId: '0',
    isUpdateCurTime: false,
    loopIndex: 0
  })



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
  const currentSong = computed(() => state.playList[state.playIndex])

  /**根据 songId 更新playindex */
  function updatePlayIndex() {
    state.playIndex = state.playList.findIndex(song => song.id === state.curSongId)
  }
  function updateCurrentPlayingSongId() {
    state.curSongId = currentSong.value.id
  }
  // function play() {

  // }
  /**添加歌单到当前播放列表 */
  function addPlayList(list: SongItem[]) {
    state.playList.splice(state.playIndex + 1, 0, ...list)
  }
  /**添加歌曲到播放列表，可选择立即播放 */
  function addSong(song: SongItem, playNow = false) {
    if (!isExist(song.id)) state.playList.splice(state.playIndex + 1, 0, song);
    if (playNow) play(song.id)
  }
  const isExist = (songId: SongId) => state.playList.some(item => item.id === songId)

  /**更新当前播放列表 ，并播放歌曲 */
  function updatePlayList(list: SongItem[], songId: SongId, stateId: string) {
    state.playList = list
    state.stateId = stateId
    play(songId)
  }

  function play(songId: SongId) {
    if (songId === state.curSongId) return console.log('正在播放该歌曲', songId)
    state.curSongId = songId
    updatePlayIndex()
  }
  //更改 是否更新播放时间
  function setIsUpdateCurTime(val: boolean) {
    state.isUpdateCurTime = val
  }

  /**上一曲 */
  function next() { state.playIndex++; updateCurrentPlayingSongId() }
  /**下一曲 */
  function prev() { state.playIndex--; updateCurrentPlayingSongId() }

  function setIsPaused(val: boolean) { state.isPaused = val }

  return {
    ...toRefs(state), currentLoopOption, switchLoopOption, setIsPaused, next, prev, addSong, updatePlayList, addPlayList, currentSong, play, setIsUpdateCurTime
  }
})