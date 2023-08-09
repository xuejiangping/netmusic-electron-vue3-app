<script setup>
// const setting = reactive([
//   {
//     label: '关闭面板',
//     option: [
//       { text: '最小化到系统托盘',index: 'hide' },
//       { text: '退出app',index: 'exit' }
//     ],
//     type: 'radio',
//     val: 'hide'
//   },
//   {
//     label: '双击播放列表时',
//     option: [
//       { text: '双击播放列表时，用当前单曲所在歌曲列表替换播放列表',index: 'updatePlaylist' },
//       { text: '双击播放列表时，仅把当前单曲添加到播放列表',index: 'addSong' }

//     ],
//     type: 'radio',
//     val: 'addSong'

//   },
//   {
//     label: '播放进度',
//     option: [{ text: '记住上一次播放进度',index: 'remember' }],
//     type: 'check',
//     val: ['remember']

//   },
//   {
//     label: '自动播放',
//     option: [{ text: '启动时自动播放上次的音乐',index: 'autoplay' }],
//     type: 'check',
//     val: ['autoplay']
//   }
// ])

import { useSettingStore } from '../store/setting-store.ts'
const setting = useSettingStore()


</script>
<template>
  <div class="box">
    <div v-for="(item) in setting">
      <h4>{{ item.label }}</h4>

      <el-radio-group v-if="item.type === 'radio'" v-model="item.val">
        <el-radio v-for="({ text, index }) in item.option" :label="index">{{ text }}</el-radio>
      </el-radio-group>
      <el-checkbox-group v-else v-model="item.val">
        <el-checkbox v-for="({ text, index }) in item.option" :label="index">{{ text }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<style scoped lang="less">
.box {
  max-height: 50vh;
  overflow: auto;

  >div {
    margin: 1rem 0;
    line-height: 2rem;
  }
}
</style>
