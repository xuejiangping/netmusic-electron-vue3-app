import Color from 'color'

//==========================================================
//
//        简单的store, 管理透明度和颜色
//
//==========================================================


const alpha = ref(60)
const curColor = ref('red')
const lastColor = ref('')

watch(curColor, (_, oloVal) => lastColor.value = oloVal)

function changeColor() {
  const rootEl = document.documentElement
  if (rootEl) {
    // let val = ''
    let styleProps = [`--color-bg-header`, '--color-text-header', '--color-bg-header-darken']
    let color_obj = Color.rgb(curColor.value).alpha(alpha.value / 100)

    const color_bg_header = color_obj.toString()
    const color_bg_header_darken = color_obj.fade(0.6).toString()


    const color_text_header = color_obj.negate().lighten(0.8).toString()
    rootEl.style.setProperty(styleProps[0], color_bg_header)
    rootEl.style.setProperty(styleProps[1], color_text_header)
    rootEl.style.setProperty(styleProps[2], color_bg_header_darken)
  }

}
watchEffect(changeColor)


export {
  alpha, curColor, lastColor
}