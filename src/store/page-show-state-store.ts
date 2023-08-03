/**************************************************
*
*
*       初始布局  header - aside - main -footer
*        布局状态，控制 主要布局的显示 
*
*
 **************************************************/


export const usePageShowStore = defineStore('page_show', () => {
  const state = reactive({
    aside: true,
    main: true,
    footer: true
  })

  // 只展示 haeder 和 main  
  function display1() {
    state.aside = false
    state.footer = false
  }

  // 还原初始布局  header - aside - main -footer
  function reset() {

    state.aside = true
    state.footer = true
  }

  return {
    ...toRefs(state), display1, reset
  }
})