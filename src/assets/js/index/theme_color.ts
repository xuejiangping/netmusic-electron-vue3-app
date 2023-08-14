import Color from 'color'
import $utils from '../../../utils/util'

//==========================================================
//
//        简单的store, 管理透明度和颜色
//
//==========================================================

const THEME_COLOR = 'theme-color'
const base = {
  curColor: 'red',
  alpha: 50,
  lastColor: '#fff'
}
const state: typeof base = shallowReactive($utils.localstorage.save_and_load(THEME_COLOR, () => state, true) || base)


const { curColor, alpha, lastColor } = toRefs(state)

watch(curColor, (_, oldVal) => {
  lastColor.value = oldVal
  // console.log(_, oldVal)
})

function changeColor() {
  const rootEl = document.documentElement
  if (rootEl) {
    // let val = ''
    let styleProps = [`--color-bg-header`, '--color-text-header', '--color-bg-header-darken']
    let color_obj = Color.rgb(curColor.value).alpha(alpha.value / 100)

    const color_bg_header = color_obj.string()
    const color_bg_header_darken = color_obj.fade(0.6).string()


    const color_text_header = color_obj.negate().lighten(0.5).alpha(0.9).string()
    rootEl.style.setProperty(styleProps[0], color_bg_header)
    rootEl.style.setProperty(styleProps[1], color_text_header)
    rootEl.style.setProperty(styleProps[2], color_bg_header_darken)


  }

}
watchEffect(changeColor)


export {
  alpha, curColor, lastColor
}