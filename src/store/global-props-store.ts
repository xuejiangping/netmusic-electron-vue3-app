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
  })

  function set_main_page_loading(val: boolean) { state.main_page_loading = val }
  return {
    ...toRefs(state),
    set_main_page_loading
  }
})