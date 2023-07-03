//@ts-nocheck

import { formatSongInfo } from './song';
import $common from '../assets/js/common.ts'
export { formatSongInfo }
export default {
  // 数字过万的处理
  formartNum(val) {
    let num = 0
    if (val > 9999) {
      num = Math.round(val / 10000 * 10) / 10 + '万'
    } else {
      num = val
    }

    return num
  },
  // 时间毫秒格式化处理 2020-10-30 09:30:00
  formartDate(originVal, fmt) {
    const dt = new Date(originVal)
    const opt = {
      yyyy: dt.getFullYear(),
      MM: (dt.getMonth() + 1 + '').padStart(2, '0'),
      dd: (dt.getDate() + '').padStart(2, '0'),
      HH: (dt.getHours() + '').padStart(2, '0'),
      mm: (dt.getMinutes() + '').padStart(2, '0'),
      ss: (dt.getSeconds() + '').padStart(2, '0')
    }

    for (const k in opt) {
      const ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(ret[1], opt[k])
      }
    }

    return fmt
  },
  // 歌曲转毫秒格式化处理 03:30 => (3*60+30) * 1000
  formatSongSecond(duration) {
    let arr = duration.split(':'),
      second = 0;

    for (let i = 0; i < arr.length; i++) {
      second += arr[i] * 60 * (arr.length - 1 - i)
    }

    second += arr[arr.length - 1] * 1;

    return second;
  },
  // 歌曲毫秒格式化处理 03:30
  formatSongTime(duration) {
    if (!duration && duration !== 0) return
    duration = duration >= 0 ? duration / 1000 : 0;
    const m = (Math.floor(duration / 60) + '').padStart(2, '0')
    const s = (Math.floor(duration % 60) + '').padStart(2, '0')
    return `${m}:${s}`
  },
  // 评论时间格式化处理
  formatMsgTime(duration) {
    let result = ''
    const NOW = new Date()
    const PAST = new Date(duration)

    // 判断是当天的时间 显示格式 10：30
    if (NOW.toDateString() === PAST.toDateString()) {
      result = this.formartDate(duration, 'HH:mm')
      // 时间为当年 显示月日 时间戳
    } else if (PAST.getFullYear() === NOW.getFullYear()) {
      result = this.formartDate(duration, 'MM月dd日 HH:mm')
    } else {
      result = this.formartDate(duration, 'yyyy年MM月dd日')
    }

    return result
  },
  // 添加歌曲到播放列表，过滤重复的歌曲
  concatPlayList(newList = [], oldList = []) {
    const arr = [...oldList, ...newList]
    const map = new Map()

    for (const item of arr) {
      if (!map.has(item.id)) {
        map.set(item.id, item)
      }
    }

    return [...map.values()]
  },

  /**
   * 
   * @param {Function} fn 需要防抖的函数
   * @param {number} t 节流时间
   * @returns 
   */

  throttle(fn, t = 1000) {
    let last = performance.now()
    return function (...args) {
      const now = performance.now()
      if (now - last >= t) { last = now; fn(...args) }
    }
  },
  debounce(fn, t = 1000) {
    let timer = null
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(fn, t, ...args)
    }
  },
  // 处理歌曲
  formatSongs(list: any[]) {
    const val = list.map((item) => {
      // 是否有版权播放
      item.license = item.privilege.cp
      const { license, name, id, ar: artists, al: album, dt: duration } = item
      return {
        license, name, id, artists, album, duration: this.formatSongTime(duration),
        audioUrl: `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      }
    })
    return val
  },
  formatPlaylist(list: any[]) {
    const val = list.map((item) => {

      // 'name' | 'trackCount' | 'creator' | 'id' | 'playCount' | 'img1v1Url' 
      const { trackCount, playCount, name, id, creator, coverImgUrl } = item
      return {
        trackCount, playCount, name, id, creator,
        img1v1Url: coverImgUrl + $common.IMG_SIZE_SEARCH_PARAMS.squar.small
      }
    })
    return val
  },
  // 视频
  formatVideolist(list: any[]) {
    const val = list.map((item) => {
      // 是否有版权播放
      const { artistName, name, id, artists, duration, playCount, cover } = item
      return {
        artistName, name, id, artists, duration: this.formatSongTime(duration),
        playCount: this.formartNum(playCount),
        cover: cover + $common.IMG_SIZE_SEARCH_PARAMS.rect.middle
      }
    })
    return val
  },
  // 歌手

  formatSingerlist(list: any[]) {
    const val = list.map((item) => {
      // 是否有版权播放
      const { accountId, id, img1v1Url, trans, name, alias } = item
      return {
        accountId, id, img1v1Url: img1v1Url + $common.IMG_SIZE_SEARCH_PARAMS.squar.small,
        trans, name, alias
      }
    })
    return val
  },
  // 专辑
  formatAlbumlist(list: any[]) {
    const val = list.map((item) => {
      // 是否有版权播放
      const { name, id, artists, picUrl, alias } = item
      return {
        name, id, artists, alias, artists,
        img1v1Url: picUrl + $common.IMG_SIZE_SEARCH_PARAMS.squar.small
      }
    })
    return val
  },



}
