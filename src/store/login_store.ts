


/**************************************************
*
*        管理登录状态
*
 **************************************************/
const COOKIE = 'cookie'

import $http from '../apis/http'

interface UserInfo {
  level: number,
  listenSongs: number,
  profile: {
    avatarUrl: string,
    backgroundUrl: string,
    birthday: number,
    createTime: number,
    signature: string,
    follows: number,
    followeds: number,
    followed: boolean,
    gender: 1 | 0,
    playlistCount: number,
    userType: 1 | 0,
    vipType: 1 | 0,
    nickname: string,
    city: number
  }
}
export const userLoginStore = defineStore('login', () => {
  const cookie = window.localStorage.getItem(COOKIE)



  // console.log('cookie', cookie)
  const state = reactive({
    loginCardVisible: false, // 登录弹窗显示与隐藏
    userInfo: null as UserInfo | null, // 登录用户信息
    cookie: cookie || ''
  })
  initUserInfo()

  const loginStatus = computed(() => !!state.cookie)

  function saveCookie(cookie: string) {
    state.cookie = cookie
    window.localStorage.setItem(COOKIE, cookie)
  }


  function logout() {
    state.cookie = ''
    window.localStorage.removeItem(COOKIE)
    state.userInfo = null
  }

  function initUserInfo() {
    if (!cookie) return
    $http.loginStatus().then(res => {
      const uid = res.data.account.id
      $http.userDetail({ uid }).then(res => state.userInfo = res)
    })
  }
  function setLoginCardVisible(val: boolean) {
    state.loginCardVisible = val
  }
  function setUserInfo(val: any) { state.userInfo = val }
  // function setLoginStatus(val: boolean) { state.loginStatus = val }

  return {
    ...toRefs(state), setLoginCardVisible, loginStatus,
    setUserInfo,
    logout, saveCookie
  }
})