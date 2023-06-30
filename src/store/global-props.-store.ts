export const useMainPageLoadingStore = defineStore('globalProps', () => {
  const main_page_loading = ref(false)
  return {
    main_page_loading
  }
})