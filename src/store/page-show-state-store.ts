/**************************************************
*
*
*       初始布局  header - aside - main -footer
*        布局状态，控制 主要布局的显示 
*
*
 **************************************************/


export const usePageShowStore = defineStore('pageShow', () => {
  const state = reactive({
    aside: true,
    main: true,
    footer: true
  })
  const { aside, main, footer } = toRefs(state)

  // 只展示 haeder 和 main  
  function display1() {
    aside.value = false
    footer.value = false
  }

  // 还原初始布局  header - aside - main -footer
  function reset() {
    aside.value = true
    footer.value = true
  }

  return {
    aside, main, footer, display1, reset
  }
})