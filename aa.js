const { $utils } = getCurrentInstance()!.appContext.config.globalProperties

//格式化后的表格数据
const tableData = computed(() => {
  if (props.dataList === null) return []
  const formatedData = $utils.formatSongs(props.dataList)
  return formatedData.map(songData => ({
    id: songData.id,
    title: songData.name,
    singer: songData.singer?.map(({ name,id }) => ({ name,id })),
    album: { name: songData.album.name,id: songData.album.id },
    duration: songData.duration,
    url: songData.url
  }))
}
)