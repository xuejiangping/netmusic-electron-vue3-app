// @ts-nocheck

// import { formatSongInfo } from './song';
import $common from '../assets/js/common.ts'
// export { formatSongInfo }
type CoverSize = keyof typeof $common.IMG_SIZE_SEARCH_PARAMS.rect
type ListType = 'albumlist' | 'playlist' | 'songlist' | 'ranklist' | 'singerlist' | 'videolist' | 'mvlist'
export default {
  // 数字过万的处理
  formartNum(val) {
    let num: string | number = 0
    if (val > 9999) {
      num = Math.round(val / 10000 * 10) / 10 + '万'
    } else {
      num = val
    }

    return num
  },
  // 时间毫秒格式化处理 2020-10-30 09:30:00
  formartDate(originVal, fmt = 'yyyy-MM-dd') {
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
  /**
   * promise 防抖
   * @param fn 
   * @param t 延迟时间默认1000
   * @returns Promise<fn()>
   */
  debounce<T extends (...args) => any>(fn: T, t = 1000) {
    let timer = null
    return function (...args: Parameters<T>): Promise<any> {
      if (timer) clearTimeout(timer)
      return new Promise(res => timer = setTimeout(() => res(fn(...args)), t))
    }
  },
  /**
   * 处理歌曲
   * @ pop 歌曲热度  0-100
   * @ fee  歌曲付费情况 
   * */
  // 处理各种列表数据
  formatList<T extends ListType>(listType: T, list: any[], coverSize: CoverSize = 'small') {
    interface Result {
      albumlist: AlbumItem[],
      playlist: PlaylistItem[],
      ranklist: any[],
      singerlist: SingerItem[],
      songlist: SongItem[],
      videolist: VideoItem[],
      mvlist: mvItem[]
    }

    let val: Result[T]
    const sizeParam = [$common.IMG_SIZE_SEARCH_PARAMS.squar[coverSize], $common.IMG_SIZE_SEARCH_PARAMS.rect[coverSize]]
    switch (listType) {
      case 'albumlist':
        val = list.map((item) => {
          const { name, id, artists, picUrl, alias, description, publishTime } = item
          return {
            name, id, artists, alias,
            cover: picUrl + sizeParam[0], publishTime: this.formartDate(publishTime),
            description
          }
        })
        break;
      case 'playlist':
        val = list.map((item) => {

          const { trackCount, playCount, name, id, creator, coverImgUrl, picUrl, createTime, description } = item
          const { nickname, userId, avatarUrl } = creator || {}
          return {
            trackCount, playCount: this.formartNum(playCount), name, id, artistName: nickname, avatar: avatarUrl,
            artistId: userId,
            cover: coverImgUrl || picUrl + sizeParam[0],
            createTime, description
          }
        })
        break;
      case 'ranklist':
        val = list.map((item) => {
          const { name, id, coverImgUrl, playCount, tracks, trackIds } = item
          return {
            name, id, playCount: this.formartNum(playCount),
            cover: coverImgUrl + sizeParam[0],
            tracks, trackIds
          }
        })
        break;
      case 'singerlist':
        val = list.map((item) => {
          const { accountId, id, img1v1Url, trans, name, albumSize, alias, musicSize, songs } = item
          return {
            accountId, id, cover: img1v1Url + sizeParam[0], albumSize, musicSize,
            tracks: songs,
            trans, name, alias
          }
        })
        break;
      case 'songlist':
        val = list.map((item) => {
          item.license = item.privilege?.cp
          const { license, name, id, ar: artists, al: album, dt, mv, fee, pop, ratio } = item
          return {
            dt, license, name, id, artists, album, mv, duration: dt && this.formatSongTime(dt), fee, pop, ratio,
            audioUrl: `https://music.163.com/song/media/outer/url?id=${id}.mp3`
          }
        })
        break;
      case 'videolist':
        val = list.map((item) => {
          const { artistName, name, id, artists, duration, playCount, cover, sPicUrl } = item
          return {
            artistName, name, id, artists, duration: duration && this.formatSongTime(duration),
            playCount: this.formartNum(playCount),
            cover: cover || sPicUrl + sizeParam[1]
          }
        })
        break;
      case 'mvlist':
        val = list.map((item) => {
          const { artistName, name, id, duration, playCount, publishTime, imgurl16v9 } = item
          return {
            artistName, name, id, duration: duration && this.formatSongTime(duration),
            playCount: this.formartNum(playCount),
            cover: imgurl16v9 + sizeParam[1], publishTime

          }
        })
        break;

      default:
        val = []
        break;
    }
    return val
  },
  /**
   * 区别单双击,只触发大于t的点击
   */
  setOnlyClick(fn: Function, t = 300) {
    let timer: any
    return function (...args: any[]) {
      if (timer) {
        clearTimeout(timer);
        timer = null
      } else {
        timer = setTimeout(() => {
          timer = null
          fn(...args)
        }, t);
      }
    }
  },
  /***********************洗牌算法*************************/
  shuffle<T extends any[]>(t: T) {
    if (t.length < 2) return t
    const val: T = []
    const _a = (arr: any[]) => {
      if (arr.length === 0) return
      let i = Math.floor(arr.length * Math.random())
      val.push(arr.splice(i, 1)[0])
      _a(arr)
    }
    _a(t.slice())
    return val
  },
  transformSongTime,
  /*********************** 存取 localstorage*************************/

  localstorage: {
    /**
  * @ 关闭页面时自动保存数据到 localstorage;
  * @ 进入页面时读取数据
  * @ 第三个参数save可 停止保存数据集
  */
    save_and_load<T>(key: string, dataGetter: () => T, save = true): T {
      save && window.addEventListener('unload', () => window.localStorage.setItem(key, JSON.stringify(dataGetter())))
      return JSON.parse(window.localStorage.getItem(key) || 'null')
    },
    clear(key: string) {
      window.localStorage.removeItem(key)
    }
  },

}
/**
 *@  歌曲当前时间 和 百分比 互相转换;;;
 *@ dt 歌曲总时长，单位 秒 或者 毫秒;;;
 */
function transformSongTime(option: { dt: number, time: number }): number
function transformSongTime(option: { dt: number, percent: number }): number
function transformSongTime(option: { dt: number, time?: number, percent?: number }) {
  const { time, percent, dt } = option
  if (time !== undefined) return time / dt * 100
  else if (percent !== undefined) return percent / 100 * dt
}
