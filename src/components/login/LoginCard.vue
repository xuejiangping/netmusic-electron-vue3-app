<script setup lang="ts">
import { PhoneFilled, Lock, Key } from '@element-plus/icons-vue'
import { ElFormItem } from 'element-plus';
import { toRefs, reactive, getCurrentInstance } from 'vue';
import { FormRules, FormInstance } from 'element-plus'

const { $store, $http, $message } = getCurrentInstance()?.proxy!
const store = $store.userLoginStore()
const { setLoginCardVisible, saveCookie } = store
enum LOGIN_STATUS {
  请求二维码 = 799, 已过期, 等待扫码, 待确认, 登录成功
}

const validateForm = reactive({
  tel: '',
  password: '',
  code: '',
})
const { tel, password, code } = toRefs(validateForm)
const formRef = ref<FormInstance>()
const validateRules: FormRules = {
  tel: [{ required: true, message: '手机号码格式不正确', pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ }],
  password: [{ required: true, pattern: /^[a-zA-Z]\w{5,17}$/, message: '密码格式不正确' }],
  code: [{ required: true, pattern: /\d{4}/, len: 4, message: '验证码格式不正确' }]
}
const { codeBtnText, qrImg, statusCode, mode, qrKey, autoLogin, codeBtnDisabled } = toRefs(reactive({
  mode: 'code' as 'password' | 'code' | 'qr',
  tel: '',
  password: '',
  code: '',
  qrKey: '',
  statusCode: LOGIN_STATUS.已过期,
  qrImg: '',
  autoLogin: true,
  codeBtnDisabled: false,
  codeBtnText: '获取验证码',
}))
const CODE_TIME = 6

getQrKey()
/***********************请求验证码*************************/

function getCode() {

  $http.getCaptcha({ phone: tel.value }).then(res => (res.data === true) && $message('验证码发送成功'))

  /***********************更改按钮状态*************************/
  codeBtnDisabled.value = true
  let t = CODE_TIME
  const upDateRestTime = (t: number) => codeBtnText.value = `剩余 ${t} s`
  upDateRestTime(t)
  const timer = setInterval(() => {
    upDateRestTime(--t)
    if (t === 0) {
      clearInterval(timer);
      codeBtnText.value = '获取验证码';
      codeBtnDisabled.value = false
    }
  }, 1000)
}

watch(mode, (val) => {
  if (val === 'qr') {
    console.log('请求二维码')
  }
}, { 'immediate': true })
watchEffect(() => poolCodeStatus())
watchEffect(() => {
  if (qrKey.value) {
    $http.getQrImg({ key: qrKey.value })
      .then(res => {
        qrImg.value = res.data.qrimg
        statusCode.value = LOGIN_STATUS.等待扫码
      })
  }
})
async function getQrKey() {
  statusCode.value = LOGIN_STATUS.请求二维码
  qrKey.value = (await $http.getQrKey()).data.unikey
}
async function login() {
  try {

    await formRef.value?.validate()
    switch (mode.value) {
      case 'password':
        $http.login({ phone: tel.value, pwd: password.value }).then(console.log)
        console.log(tel.value, password.value)
        break
      case 'code':
        $http.login({ phone: tel.value, captcha: code.value }).then(console.log)
        console.log(tel.value, code.value)

        break
    }
  } catch (err) {
    console.log('验证失败', err)
  }
}

async function poolCodeStatus(t = 2000) {
  if (qrKey.value) {
    const timer = setInterval(async () => {
      const res = await $http.getQrStatus({ key: qrKey.value })
      const { code, cookie } = res

      switch (code) {
        case LOGIN_STATUS.已过期:
          clearInterval(timer)
          statusCode.value = LOGIN_STATUS.已过期
          break
        case LOGIN_STATUS.待确认:
          statusCode.value = LOGIN_STATUS.待确认
          break
        case LOGIN_STATUS.登录成功:
          statusCode.value = LOGIN_STATUS.登录成功
          clearInterval(timer)
          setLoginCardVisible(false)
          saveCookie(cookie)
          console.log('登录成功', res)
          break
      }
    }, t)
  }

}


</script>

<template>
  <teleport to="body">
    <div class="box1-bg">

      <div class="box1">
        <div class="qr" v-show="mode === 'qr'">
          <h3>扫码登录</h3>
          <div class="qr-img" v-loading="statusCode === LOGIN_STATUS.请求二维码">
            <img :src="qrImg" />
            <div v-if="statusCode === LOGIN_STATUS.待确认 || statusCode === LOGIN_STATUS.已过期" class="status-block">
              <span v-show="LOGIN_STATUS.已过期 === statusCode" @click="getQrKey">二维码已过期,点击重新获取</span>
              <span v-show="LOGIN_STATUS.待确认 === statusCode">已扫描，等待确认</span>
            </div>
          </div>
          <div @click="mode = 'password'">
            <my-link color="var(--color-text-main)">选择其它登录方式</my-link>
          </div>
        </div>
        <div class="tel" v-show="mode === 'password' || mode === 'code'">

          <h3 @click="mode = 'qr'"> <my-link color="var(--color-text-main)">扫码登录更安全</my-link>
          </h3>

          <div style="margin: 1rem 0;font-size: 14px;">
            <el-form ref="formRef" :model="validateForm" :rules="validateRules">
              <el-form-item prop="tel">
                <el-input v-model.number="validateForm.tel" placeholder="请输入手机号" :prefix-icon="PhoneFilled" />
              </el-form-item>
              <el-form-item prop="password" v-if="mode === 'password'">
                <el-input type="password" v-model="validateForm.password" placeholder="请输入密码" :prefix-icon="Lock" />
              </el-form-item>

              <el-form-item prop="code" v-else-if="mode === 'code'">
                <el-input v-model.number="validateForm.code" placeholder="请输入验证码" :prefix-icon="Key">
                  <template #append>
                    <el-button @click="getCode" :disabled="codeBtnDisabled" type="danger">{{ codeBtnText }}</el-button>
                  </template>
                </el-input>
              </el-form-item>

              <el-row justify='space-between'>
                <el-col :span="8">
                  <el-checkbox size="small" v-model="autoLogin" label="自动登录" />
                </el-col>
                <el-col :span="10">
                  <my-link @click="mode = 'code'" v-show="mode === 'password'">验证码登录</my-link>
                  <my-link @click="mode = 'password'" v-show="mode === 'code'">密码登录</my-link>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button @click="login" style="width: 100%;" type="primary">登录</el-button>
              </el-form-item>
            </el-form>

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
    line-height: 40px;
    box-shadow: var(--el-box-shadow-dark);

    .qr-img {
      position: relative;
      display: inline-block;
      margin: 1rem 0;
      width: 12rem;
      aspect-ratio: 1/1;
      background-size: cover;

      .status-block {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        line-height: 2rem;
        font-weight: 700;
        backdrop-filter: blur(5px);
        // background-color: hotpink;

      }

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