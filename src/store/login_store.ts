/**************************************************
*
*
*        管理登录状态
*
*
 **************************************************/
export const userLoginStore = defineStore('play_state', () => {
  const state = reactive<{
    loginDialogVisible: boolean,
    userInfo: null
  }>({
    loginDialogVisible: false, // 登录弹窗显示与隐藏
    userInfo: null, // 登录用户信息
  })

  return {
    ...toRefs(state)
  }
})