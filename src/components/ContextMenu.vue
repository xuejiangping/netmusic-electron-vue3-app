<script setup lang="ts">

defineProps<{
  state: { x: number, y: number, isShow: boolean },
  menu: { label: string, handler?: () => void }[]
}>()




// function useContextMenuInfo(target: HTMLElement) {
//   console.log('target', target)
//   if (!target) throw new Error('target 必须是一个html元素')

//   const state = shallowReactive({
//     x: 0,
//     y: 0,
//     isShow: false
//   })

//   const open = function (e: MouseEvent) {
//     state.isShow = true
//     state.x = e.offsetX
//     state.y = e.offsetY

//   }
//   const close = () => state.isShow = false
//   target.addEventListener('contextmenu', open)
//   document.addEventListener('click', close, true)
//   onBeforeUnmount(() => {
//     target.removeEventListener('contextmenu', open)
//     document.removeEventListener('click', close)
//   })

//   return state
// }


// const state = useContextMenuInfo(props.targetEl)





</script>

<template>
  <div v-if="state.isShow">
    <Teleport to="body">
      <el-card class="card" body-style="padding:5px" :style="{ top: state.y + 'px', left: state.x + 'px' }">
        <div v-for="({ label, handler }) in menu" class="item " @click="handler">{{ label }}</div>
      </el-card>
    </Teleport>

  </div>
</template>

<style scoped lang="less">
.card {
  position: absolute;
  z-index: 9;
  font-size: 1rem;

  .item {
    padding: 3px 10px;
  }

  .item:hover {
    background-color: var(--color-bg-main);
  }
}
</style>