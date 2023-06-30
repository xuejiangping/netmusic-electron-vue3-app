const path = require('path');
const fs = require('fs/promises');
const viewsDir = require('./viewsDir.js')
// // import fs from 'fs/promises'
// // import path from 'path'



const vueTemplateStr = (msg) => `<script setup lang="ts">
  
</script>

<template>
  <div>${msg}</div>
</template>

<style scoped lang="less">
  
</style>
`
const pageJsStr = (msg,i) => `export default { name:'${msg}',menuOrder:${i} }`
// type RoutesInfo = Readonly<{ name: string, children?: RoutesInfo }[]>

async function createViewsDir(root,routesInfo) {
  try {
    await fs.access(root,fs.constants.F_OK)
    routesInfo.forEach(async (item,i) => {
      if (!item.name) return
      let pathA = path.join(root,item.name.toString())
      fs.access(pathA,fs.constants.F_OK)
        .catch(async () => {
          try {
            console.log('创建路径',pathA)
            await fs.mkdir(pathA)
            let pathB = path.join(pathA,'index.vue')
            let pathC = path.join(pathA,'page.ts')
            fs.writeFile(pathB,vueTemplateStr(item.name),{ flag: 'w' })
            fs.writeFile(pathC,pageJsStr(item.name,i),{ flag: 'w' })
            if (item.children && item.children.length > 0) {
              createViewsDir(pathA,item.children)  //递归创建子路径中的文件夹或文件夹
            }
          } catch (error) {
            console.error(error)
          }
        })
    })
  } catch (err) {
    console.log('根目录不存在',root)
    await fs.mkdir(root)
    console.log('新建根目录,重新调用createViewsDir',root)
    createViewsDir(root,routesInfo)
  }

}

module.exports = () => createViewsDir('./src/views/',viewsDir)

// main('./',routes)