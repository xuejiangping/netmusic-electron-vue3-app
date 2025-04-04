import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron, { startup } from "vite-plugin-electron";
import path from 'path'
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import cjsExternals from 'vite-plugin-commonjs-externals'
const PORT = 5173



// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {}
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts'
    }),
    electron({
      'entry': path.join(__dirname, './electron-main/main.ts'),
    }),
    cjsExternals({ externals: ['path'] })  //转换cjs的模块为esmodule使用
  ],
  server: { port: PORT },
  optimizeDeps: {
    // include: ['@vue/babel-plugin-jsx']
  },
  build: {

  },

  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@components': path.join(__dirname, './src/components'),
      '@store': path.join(__dirname, './src/store'),
    }
  }

})