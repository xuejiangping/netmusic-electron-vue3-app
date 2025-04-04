import { useGlobalPropsStore } from '../store/global-props-store.ts'
import $utils from './util.ts'
import { ElMessageBox } from 'element-plus'
const { set_main_page_loading } = useGlobalPropsStore()

/*********************** 
 * 将全局loading设为true ，等所有异步任务完成，将loading关闭,并返回异步任务结果
 * *************************/
export async function loading<T>(tasklist: Promise<T>[]) {
  let res: T[] = []
  try {
    set_main_page_loading(true)
    res = await Promise.all(tasklist)
  } catch (error: any) {
    ElMessageBox({ title: '加载数据失败了', message: error.message, type: 'error' })
  } finally {
    set_main_page_loading(false)
    return res
  }
}
/**
 * 包装请求函数，使其每次请求自动加载新分页，并带有防抖功能
 * @param fn 请求数据的函数，需带有 {limit,offset} 
 * @param t 防抖延时，默认1000
 * @param i 起始页，默认为0
 */

export function getMoreHandler<U extends (arg: any) => any>(fn: U, t?: number, i = 0) {
  type Arg2 = Omit<Parameters<U>['0'], 'offset'>
  return $utils.debounce(function (arg: Arg2) {
    return fn({ ...arg, offset: arg.limit * i++ })
  }, t)
}