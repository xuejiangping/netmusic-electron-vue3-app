/**************************************************
*
*
*        一些全局的公共状态，比如：main界面的 loading状态
*
*
 **************************************************/

export const useMainPageLoadingStore = defineStore('global_props', () => {
  const state = reactive({
    main_page_loading: false,

  })
  return {
    ...toRefs(state)
  }
})