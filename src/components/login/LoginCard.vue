<script setup lang="ts">
import { PhoneFilled, Lock } from '@element-plus/icons-vue'
import { toRefs, reactive, getCurrentInstance } from 'vue';

const { $store, $http } = getCurrentInstance()?.proxy!
const store = $store.userLoginStore()
const { setLoginCardVisible } = store

const { codeBtnText, mode, qrKey, tel, password, code, autoLogin, codeBtnDisabled } = toRefs(reactive({
  mode: 'qr' as 'password' | 'code' | 'qr',
  tel: '',
  password: '',
  code: '',
  qrKey: '',
  autoLogin: true,
  codeBtnDisabled: false,
  codeBtnText: '获取验证码',
}))
const CODE_TIME = 6
enum LOGIN_STATUS {
  已过期 = 800, 等待扫码, 待确认, 登录成功
}

/***********************请求验证码*************************/

function getCode() {

  /***********************更改按钮状态*************************/
  codeBtnDisabled.value = true
  let t = CODE_TIME
  const upDateRestTime = (t: number) => codeBtnText.value = `剩余 ${t} s`
  upDateRestTime(t)
  const timer = setInterval(() => {
    upDateRestTime(--t)
    if (t === 0) { clearInterval(timer); codeBtnText.value = '获取验证码'; codeBtnDisabled.value = false }
  }, 1000)
}

watch(mode, (val) => {
  if (val === 'qr') {
    console.log('请求二维码')
  }
}, { 'immediate': true })

function login() {
  // $http.login({ phone:tel.value,pwd:password.value})
  switch (mode.value) {
    case 'password':
      $http.login({ phone: tel.value, pwd: password.value })

      break
    case 'code':
      $http.login({ phone: tel.value, captcha: code.value })

      break
  }
}

watchEffect(poolCodeStatus)

function poolCodeStatus() {
  if (qrKey.value) {
    // console.log('11', 11)
    let timer = setInterval(async () => {
      const { code, message } = await $http.getQrStatus({ key: qrKey.value })
      if (code === LOGIN_STATUS.已过期) {
        clearTimeout(timer)

      } else if (code === LOGIN_STATUS.登录成功) {
        clearTimeout(timer)

      }
      console.log(message, code)
    }, 1000)
  }

}


</script>

<template>
  <teleport to="body">
    <div class="box1-bg">

      <div class="box1">
        <div v-show="mode === 'qr'">
          <h3>扫码登录</h3>
          <div class="qr-img">
            <img src="https://p2.music.126.net/ATce5mCIf_GqCLBqJcmzTg==/109951165166142900.jpg?param=300y300" />
          </div>
          <div @click="mode = 'password'">
            <my-link color="var(--color-text-main)">选择其它登录方式</my-link>
          </div>
        </div>
        <div v-show="mode === 'password' || mode === 'code'">

          <h3 @click="mode = 'qr'"> <my-link color="var(--color-text-main)">扫码登录更安全</my-link>
          </h3>

          <div style="margin: 1rem 0;font-size: 14px;">
            <el-input v-model="tel" class="w-50 m-2" placeholder="请输入手机号" :prefix-icon="PhoneFilled" />
            <el-input v-if="mode === 'password'" v-model="password" class="w-50 m-2" placeholder="请输入密码"
              :prefix-icon="Lock" />
            <el-input v-else-if="mode === 'code'" v-model="code" class="w-50 m-2" placeholder="请输入验证码" :prefix-icon="Key">
              <template #append>
                <!-- <span></span> -->
                <el-button @click="getCode" :disabled="codeBtnDisabled" type="danger">{{ codeBtnText }}</el-button>
              </template>
            </el-input>

            <el-row justify='space-between'>
              <el-col :span="8">
                <el-checkbox size="small" v-model="autoLogin" label="自动登录" />
              </el-col>
              <el-col :span="10">
                <my-link @click="mode = 'code'" v-show="mode === 'password'">验证码登录</my-link>
                <my-link @click="mode = 'password'" v-show="mode === 'code'">密码登录</my-link>
              </el-col>
            </el-row>
            <el-row>
              <el-button @click="login" style="width: 100%;" size="" type="primary">登录</el-button>
            </el-row>
          </div>

        </div>
      </div>
      <my-link @click="setLoginCardVisible(false)" class="close">✖️</my-link>

    </div>

  </teleport>
</template>

<style scoped lang="less">
// background-color: pink;
.box1-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
  width: 25%;
  // border: 1px solid hotpink;
  min-width: 240px;
  max-width: 400px;
  background-image: url('../../assets/img/login-bg.webp');
  background-size: cover;

  .close {
    position: absolute;
    right: 5px;
    top: 5px
  }

  .box1 {



    backdrop-filter: blur(15px);


    text-align: center;
    padding: 1rem 2.5rem;
    line-height: 45px;
    box-shadow: var(--el-box-shadow-dark);

    .qr-img {
      display: inline-block;
      margin: 1rem 0;
      width: 10rem;
      aspect-ratio: 1/1;

      img {
        width: 100%;
      }
    }

    &:deep(.el-input-group__append) {
      padding: 0 1rem;
    }
  }
}
</style>