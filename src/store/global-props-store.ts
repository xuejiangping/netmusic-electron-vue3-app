/**************************************************
*
*
*        一些全局的公共状态，比如：main界面的 loading状态
*
*
 **************************************************/
type ThemeColor = 'red' | 'pink' | 'blue' | 'black' | 'white'

export const useGlobalPropsStore = defineStore('global_props', () => {
  const state = reactive({
    main_page_loading: false,
    song_detail_status: false,
    cur_theme_color: 'my-theme-red'
  })
  function change_theme_color(color: ThemeColor) {
    state.cur_theme_color = `my-theme-${color}`
  }
  window.aaa = change_theme_color
  function set_song_detail_status(val: boolean) { state.song_detail_status = val }
  function set_main_page_loading(val: boolean) { state.main_page_loading = val }
  return {
    ...toRefs(state),
    set_main_page_loading,
    set_song_detail_status
  }
})