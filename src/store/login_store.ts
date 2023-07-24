/**************************************************
*
*        管理登录状态
*
 **************************************************/
export const userLoginStore = defineStore('login', () => {
  const state = reactive({
    loginCardVisible: false, // 登录弹窗显示与隐藏
    loginStatus: false,
    userInfo: null, // 登录用户信息
  })
  function setLoginCardVisible(val: boolean) {
    state.loginCardVisible = val
  }
  function setUserInfo(val: any) { state.userInfo = val }
  function setLoginStatus(val: boolean) { state.loginStatus = val }

  return {
    ...toRefs(state), setLoginCardVisible, setUserInfo, setLoginStatus
  }
})