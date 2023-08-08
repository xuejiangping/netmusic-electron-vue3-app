/**************************************************
*
*
*        一些全局的公共状态，比如：main界面的 loading状态
*
*
 **************************************************/

export const useGlobalPropsStore = defineStore('global_props', () => {
  const state = reactive({
    main_page_loading: false,
    song_detail_status: false,
  })

  function set_song_detail_status(val: boolean) { state.song_detail_status = val }
  function set_main_page_loading(val: boolean) { state.main_page_loading = val }
  return {
    ...toRefs(state),
    set_main_page_loading,
    set_song_detail_status
  }
})