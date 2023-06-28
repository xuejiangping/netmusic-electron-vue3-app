
//==========================================================
//
//          这个store主要由于seach界面的动态组件数据
//
//  因为search 界面有多个选项卡数据，且使用了动态组件而非路由，路由到其它界面再回来，
// 所有 需要这个store来储存 来缓存这些数据
//        
//
//
//==========================================================


import $COMMON from '../assets/js/common.ts'
const tagInfoEnum = $COMMON.SEARCH_TYPE_ENUM

import { defineStore } from 'pinia'


interface DataRaw { data: any[] | null, count: number }
type TagInfoEnumValue = GetValue<typeof tagInfoEnum>
type DataListInfo = { [P in TagInfoEnumValue]: DataRaw }



export const useSearchPanelStore = defineStore('counter', () => {
  const lastActiveIndex = ref<TagInfoEnumValue>(tagInfoEnum.单曲)
  const lastKeyword = ref('')
  const dataListInfo = shallowReactive<DataListInfo>({
    [tagInfoEnum.单曲]: { data: null, count: 0 },
    [tagInfoEnum.歌手]: { data: null, count: 0 },
    [tagInfoEnum.视频]: { data: null, count: 0 },
    [tagInfoEnum.专辑]: { data: null, count: 0 },
    [tagInfoEnum.歌单]: { data: null, count: 0 }
  })
  const setLastActiveIndex = (val: TagInfoEnumValue) => { lastActiveIndex.value = val }
  //@ts-ignore  忽视 for in 循环 报错
  const resetDataListInfo = () => { for (let k in dataListInfo) dataListInfo[k] = { data: null, count: 0 } }
  const setDataListInfo = (key: TagInfoEnumValue, value: Partial<DataRaw>) => dataListInfo[key] = { ...dataListInfo[key], ...value }
  const setLastKeyword = (val: string) => lastKeyword.value = val
  return { setLastKeyword, lastActiveIndex, dataListInfo, resetDataListInfo, lastKeyword, setDataListInfo, setLastActiveIndex }
})
