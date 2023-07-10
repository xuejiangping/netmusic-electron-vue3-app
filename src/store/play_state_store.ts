/**************************************************
*
*
*        管理播放状态
*
*
 **************************************************/
export default defineStore('play_state', () => {
  const state = reactive<{
    playList: SongItem[],
    currentPlayingSongId: number,
    playIndex: number
    isPaused: boolean, // 当前播放状态

  }>({
    isPaused: false, // 当前播放状态
    playList: [], // 播放列表
    playIndex: 0, // 当前播放歌曲在播放列表的所有位置
    // isShowPlayListTips: false, // 添加及播放成功后，播放列表按钮提示的文字
    currentPlayingSongId: 0
  })
  /**当前播放歌曲的id */
  const currentPlayingSongId = computed(() => state.playList[state.playIndex].id)
  return {
    ...toRefs(state), currentPlayingSongId
  }
})