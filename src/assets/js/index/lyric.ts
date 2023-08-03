import LyricHandler from '../../../utils/lyricHandler.ts'
// const store = $store.usePlayStateStore()

export default function ({ currenPlayTimeRef, id }: { currenPlayTimeRef: Ref<number>, id: Ref<string> }) {
  const { $http } = getCurrentInstance()?.proxy!

  const { lyric, offsetTime, curIndex } = toRefs(shallowReactive({
    lyric: null as LyricHandler | null,
    offsetTime: 0,
    curIndex: 0

  }))


  // let lastIndex: number

  watchEffect(() => {
    $http.lyrics({ id: id.value })
      .then(res => lyric.value = new LyricHandler(res.lrc.lyric))
  })
  watchEffect(() => {
    if (lyric.value) {
      const t = currenPlayTimeRef.value * 1000 + offsetTime.value
      const _lyric = unref(lyric)!
      const _curIndex = _lyric._findCurNum(t)
      if (_curIndex === _lyric.curLine) return
      _lyric.curLine = _curIndex
      curIndex.value = _curIndex
    }
  })

  return {
    offsetTime, curIndex, lyric
  }
}

