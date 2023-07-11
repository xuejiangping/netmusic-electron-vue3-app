/**************************************************
*
*
*        管理播放状态
*
*
 **************************************************/
type SongId = SongItem['id']
type PlayState = {
  stateId: string,    //当前列表的唯一id，用于区别新列表，一般用歌单id，或者专辑id等唯一值
  playList: SongItem[],
  currentPlayingSongId: string,
  playIndex: number
  isPaused: boolean, // 当前播放状态
  playProgressBarIsPressed: boolean   //播放进度条是否按下，按下期间歌曲播放不更新进度条

}
export default defineStore('play_state', () => {
  const state = reactive<PlayState>({
    isPaused: false, // 当前播放状态
    playList: [], // 播放列表
    playIndex: 0, // 当前播放歌曲在播放列表的所有位置
    // isShowPlayListTips: false, // 添加及播放成功后，播放列表按钮提示的文字
    currentPlayingSongId: '0',
    stateId: '0',
    playProgressBarIsPressed: false
  })


  const currenPlayingSong = computed(() => state.playList[state.playIndex])


  /**根据 songId 更新playindex */
  function updatePlayIndex() {
    state.playIndex = state.playList.findIndex(song => song.id === state.currentPlayingSongId)
  }
  function updateCurrentPlayingSongId() {
    state.currentPlayingSongId = currenPlayingSong.value.id
  }
  // function play() {

  // }
  function addPlayList(list: SongItem[]) {
    state.playList.splice(state.playIndex + 1, 0, ...list)
  }
  /**添加歌曲到播放列表，可选择立即播放 */
  function addSong(song: SongItem, playNow = false) {
    if (!isExist(song.id)) state.playList.splice(state.playIndex + 1, 0, song);
    if (playNow) play(song.id)
  }
  const isExist = (songId: SongId) => state.playList.some(item => item.id === songId)


  function updatePlayList(list: SongItem[], songId: SongId, stateId: string) {
    state.playList = list
    state.stateId = stateId
    play(songId)
  }

  function play(songId: SongId) {
    if (songId === state.currentPlayingSongId) return console.log('正在播放该歌曲', songId)
    state.currentPlayingSongId = songId
    updatePlayIndex()
  }
  //更改进度条是否按下
  function setPlayProgressBarIsPressedVal(val: boolean) {
    state.playProgressBarIsPressed = val
  }

  /**上一曲 */
  function next() { state.playIndex++; updateCurrentPlayingSongId() }
  /**下一曲 */
  function prev() { state.playIndex--; updateCurrentPlayingSongId() }

  return {
    ...toRefs(state), next, prev, addSong, updatePlayList, addPlayList, currenPlayingSong, play, setPlayProgressBarIsPressedVal
  }
})