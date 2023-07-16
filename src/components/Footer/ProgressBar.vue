<script setup lang="ts">
// const val = ref(80)

import usePlayStateStore from '../../store/play_state_store'

// const { playProgressBarIsPressed } = usePlayStateStore()
const { setIsUpdateCurTime } = usePlayStateStore()

const props = withDefaults(defineProps<{
  color1?: string,
  color2?: string,
  height?: number
  modelValue: number,
  power?: number,
  thumb_color?: string,
}>(), {
  height: 3,
  modelValue: 80,
  power: 2.5,
  thumb_color: 'red',
})
const step = 1.5
const { size_default, size_bigger, thumb_height, thumb_width, thumb_color } = {
  size_default: props.height + 'px',
  size_bigger: (props.height * step) + 'px',
  thumb_width: props.height * props.power + 'px',
  thumb_height: props.height * props.power + 'px',
  thumb_color: props.thumb_color
}
const gradient = computed(() => `linear-gradient(to right, red ${props.modelValue}%,pink ${props.modelValue}%)`)
defineEmits(['change', 'update:modelValue'])

/***********************进度条是否按下，即拖动开始*************************/

</script>


<template>
  <div>
    <input type="range" v-bind="modelValue" :value="modelValue" @mousedown="setIsUpdateCurTime(true)"
      @mouseup="setIsUpdateCurTime(false)" @change="$emit('change', ($event.target as HTMLInputElement).valueAsNumber)"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).valueAsNumber)">
  </div>
</template>

<style scoped lang="less">
input[type=range] {
  appearance: none;
  width: 100%;
  height: v-bind(size_default);
  background-image: v-bind(gradient);
  border-radius: 10px;
  // transition: height 0.1s;

  &::-webkit-slider-thumb {
    appearance: none;
    display: none;
    width: v-bind(thumb_width);
    height: v-bind(thumb_height);
    background-color: v-bind(thumb_color);
    border-radius: 50%;
  }


  &:hover {
    height: v-bind(size_bigger);

    &::-webkit-slider-thumb {
      display: block;
    }
  }

}
</style>
