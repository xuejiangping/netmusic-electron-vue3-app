import { useGlobalPropsStore } from '../store/global-props-store.ts'
const { set_main_page_loading } = useGlobalPropsStore()

/*********************** 
 * 将全局loading设为true ，等所有异步任务完成，将loading关闭
 * *************************/
export async function loading(tasklist: Promise<any>[]) {
  set_main_page_loading(true)
  await Promise.all(tasklist)
  set_main_page_loading(false)
}