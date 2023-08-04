import app from '../utils/app'

/***********************全局指令*************************/
// 使用自定分割符 分割多个元素
app.directive('split', (el: HTMLElement, { value }) => {
  let [i, separator] = value
  if (!separator) separator = ' / '
  if (i > 0 && !el.textContent?.includes(separator)) {
    const span = document.createElement('span')
    span.classList.add('separator')
    span.textContent = separator
    el.prepend(span)
  }
})
// 给元素自动添加title
app.directive('title', (el: HTMLElement) => {
  // console.log('arg', arg)      
  el.title = el.textContent!
  el.classList.add('text-in-oneline')
})
/**  利用 IntersectionObserver 实现无限滚动 */
app.directive('my-infinite-scroll', {
  mounted(el: HTMLElement & { ob: IntersectionObserver }, binding) {

    const footerEl = document.createElement('div')
    footerEl.style.height = '1rem'
    const getmoreFN = binding.value
    el.parentElement?.appendChild(footerEl)
    const ob = el.ob = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
        getmoreFN()()
      }
    })
    ob.observe(footerEl)

  },
  unmounted(el) {
    const ob = el.ob as IntersectionObserver
    ob.disconnect()
  }
})
app.directive('topN', (el: HTMLElement, { value }) => value[0] < value[1] && (el.style.color = 'red'))
