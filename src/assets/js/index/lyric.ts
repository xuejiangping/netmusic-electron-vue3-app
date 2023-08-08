import LyricHandler from '../../../utils/lyricHandler.ts'

// const store = $store.usePlayStateStore()

export function lyric_handler({ currenPlayTimeRef, id }: { currenPlayTimeRef: Ref<number | undefined>, id: Ref<string | undefined> }) {
  const { $http } = getCurrentInstance()?.proxy!

  const { lyric, offsetTime, curIndex } = toRefs(shallowReactive({
    lyric: null as LyricHandler | null,
    offsetTime: 0,
    curIndex: 0

  }))


  const watch_stop_a = watchEffect(() => {
    if (id.value) {
      $http.lyrics({ id: id.value }).then(res => lyric.value = new LyricHandler(res.lrc.lyric))

    }
  })
  const watch_stop_b = watchEffect(() => {
    if (lyric.value && currenPlayTimeRef.value) {
      const t = currenPlayTimeRef.value * 1000 + offsetTime.value
      const _lyric = unref(lyric)!
      const _curIndex = _lyric._findCurNum(t)
      if (_curIndex === _lyric.curLine) return
      _lyric.curLine = _curIndex
      curIndex.value = _curIndex
    }
  })

  onBeforeUnmount(() => {
    watch_stop_a()
    watch_stop_b()
  })

  // let lastIndex: number



  return {
    offsetTime, curIndex, lyric
  }
}

