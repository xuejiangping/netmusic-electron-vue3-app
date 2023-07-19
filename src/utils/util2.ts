import { useGlobalPropsStore } from '../store/global-props-store.ts'
import $utils from './util.ts'
const { set_main_page_loading } = useGlobalPropsStore()

/*********************** 
 * 将全局loading设为true ，等所有异步任务完成，将loading关闭
 * *************************/
export async function loading(tasklist: Promise<any>[]) {
  set_main_page_loading(true)
  await Promise.all(tasklist)
  set_main_page_loading(false)
}
/**
 * 包装请求函数，使其每次请求自动加载新分页，并带有防抖功能
 * @param fn 请求数据的函数，需带有 {limit,offset} 
 * @param t 防抖延时，默认1000
 * @param i 起始页，默认为0
 */

export function getMoreHandler<T extends { limit: number, offset: number, id: string } & Record<string, any>, U extends (arg: T) => any>(fn: U, t?: number, i = 0) {
  type Arg2 = Omit<Parameters<U>['0'], 'offset'>
  return $utils.debounce(function (arg: Arg2): ReturnType<U> {
    let b = { ...arg, offset: arg.limit * i++ }
    return fn(b)
  }, t)
}