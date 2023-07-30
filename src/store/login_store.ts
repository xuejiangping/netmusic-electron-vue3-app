


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
    city: number,
    userId: string
    eventCount: number
  }
}
export const userLoginStore = defineStore('login', () => {
  const cookie = window.localStorage.getItem(COOKIE)



  // console.log('cookie', cookie)
  const state = reactive({
    loginCardVisible: false, // 登录弹窗显示与隐藏
    userInfo: null as UserInfo | null, // 登录用户信息
    cookie: cookie || '',
    userPlaylist: [] as PlaylistItem[],
    todaySignedIn: false
  })

  const loginStatus = computed(() => !!state.cookie)



  watchEffect(() => {
    if (!state.cookie) return
    $http.loginStatus({ cookie: state.cookie }).then(res => {
      // console.log('res', res)
      const uid = res.data.account.id
      $http.userDetail({ uid }).then(res => state.userInfo = res)
      $http.playlistUser({ uid }).then(res => state.userPlaylist = res.playlist)
    })
    update_signin_status()
  })
  function update_signin_status() {
    $http.signin_status({ cookie: state.cookie }).then(res => state.todaySignedIn = res.data.today.todaySignedIn)

  }

  function signin() {
    $http.daily_signin({ cookie: state.cookie }).then(() => {
      update_signin_status()
    })
  }

  function saveCookie(cookie: string) {
    state.cookie = cookie
    window.localStorage.setItem(COOKIE, cookie)
  }


  function logout() {
    state.cookie = ''
    window.localStorage.removeItem(COOKIE)
    state.userInfo = null
    state.userPlaylist = []
  }

  function setLoginCardVisible(val: boolean) {
    state.loginCardVisible = val
  }

  return {
    ...toRefs(state), setLoginCardVisible, loginStatus,
    logout, saveCookie, update_signin_status, signin
  }
})