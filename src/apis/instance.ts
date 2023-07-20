
//**********************定义axios示例*********************************** */
/**@module  定义axios示例*/
import axios, { AxiosInstance } from 'axios';
// import type {} from 'axios'
import app from '../utils/app.ts'
const appProxy = app.config.globalProperties
const baseURL = 'https://service-0kp9q9xl-1312772435.cd.apigw.tencentcs.com/release/'
const instance = axios.create({
  timeout: 1000 * 30,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: status => {
    return status >= 200 && status < 300; // default
  },
  baseURL // 服务端域名
});
// window.open('https://www.douyin.com')
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  appProxy.$alert('请求数据出错！')

  return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { code, message } = response.data
  if (code && code === 200) {
    return response.data
  } else {
    appProxy.$alert(`响应数据失败,code:${code} message:${message}`)
    return Promise.reject(['响应数据失败,code:' + code, response])
  }

}, function (error) {
  // 对响应错误做点什么
  appProxy.$alert(`响应数据出错！ ${error}}`)

  return Promise.reject(error);
});



interface API {
  get: (...args: Parameters<AxiosInstance['get']>) => Promise<any>
  post: (...args: Parameters<AxiosInstance['post']>) => Promise<any>

}

const api: API = {
  get: (...args) => instance['get'](...args),
  post: (...args) => instance['post'](...args)
}



// api.get('https://www.baidu.com').then(console.log).catch(console.log)
export default api;
