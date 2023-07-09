export const usePageShowStore = defineStore('pageShow', () => {
  const state = reactive({
    aside: true,
    main: true,
    footer: true
  })
  const { aside, main, footer } = toRefs(state)

  function display1() {
    aside.value = false
    footer.value = false
  }
  function reset() {
    aside.value = true
    footer.value = true
  }

  return {
    aside, main, footer, display1, reset
  }
})