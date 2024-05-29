<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElButton,
  ElIcon,
  vLoading,
  ElMessage,
  ElNotification
} from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface ILoginParam {
  username: string
  password: string
}

const LOCAL_LOGIN_PARAM_KEY = 'login-param'

const router = useRouter()
const route = useRoute()

const loginParam = reactive<ILoginParam>({
  username: '',
  password: ''
})
const rememberMe = ref(false)
const loading = ref(false)
const passwordVisible = ref(false)
const formRef = ref<FormInstance>()

const onSubmit = () => {
  formRef.value?.validate(async (isValid, invalidFields) => {
    if (isValid && !loading.value) {
      loading.value = true
      try {
        await delay(500)
        loading.value = false
        if (rememberMe.value) {
          localStorage.setItem(LOCAL_LOGIN_PARAM_KEY, JSON.stringify(loginParam))
        } else {
          localStorage.removeItem(LOCAL_LOGIN_PARAM_KEY)
        }
        const redirect = route.query.redirect as string
        if (redirect && redirect.startsWith('http')) {
          window.location.href = redirect
        } else {
          router.replace(redirect || '/')
          ElNotification({
            title: '下午好！',
            message: '欢迎登录XXX系统',
            type: 'success'
          })
        }
      } catch (e) {
        ElMessage.error('登录失败')
      }
    }
  })
}

const rules: FormRules<ILoginParam> = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
}

const loadLocalUser = () => {
  try {
    const localParamString = localStorage.getItem(LOCAL_LOGIN_PARAM_KEY)
    if (!localParamString) {
      return
    }
    const localParam = JSON.parse(localParamString)
    loginParam.username = localParam.username || ''
    loginParam.password = localParam.password || ''
    rememberMe.value = true
  } catch (e) {
    console.log(e)
  }
}
loadLocalUser()
</script>
<template>
  <div
    class="flex items-center justify-center w-full h-screen bg-no-repeat bg-center bg-cover bg-[url('/login-bg.jpg')]"
  >
    <div class="w-[440px] rounded-md bg-white p-12">
      <div class="flex mb-10 items-center justify-center">
        <img class="w-10" src="../../assets/logo.svg" alt="logo" />
        <div class="text-2xl font-bold">后台管理系统</div>
      </div>
      <ElForm size="large" ref="formRef" :model="loginParam" :rules="rules">
        <ElFormItem prop="username" required>
          <ElInput
            v-model="loginParam.username"
            :maxlength="20"
            placeholder="用户名"
            :prefix-icon="User"
          >
          </ElInput>
        </ElFormItem>
        <ElFormItem prop="password" required>
          <ElInput
            :type="passwordVisible ? 'text' : 'password'"
            v-model="loginParam.password"
            :maxlength="20"
            placeholder="密码"
            :prefix-icon="Lock"
          >
            <template v-slot:suffix>
              <ElIcon class="cursor-pointer" @click="passwordVisible = !passwordVisible">
                <View v-if="passwordVisible" />
                <Hide v-else />
              </ElIcon>
            </template>
          </ElInput>
        </ElFormItem>
        <ElFormItem class="-mt-4 mb-3">
          <ElCheckbox v-model="rememberMe">记住密码</ElCheckbox>
        </ElFormItem>
        <ElFormItem>
          <ElButton
            size="large"
            class="w-full"
            type="primary"
            v-loading.fullscreen.lock="loading"
            @click="onSubmit"
            >登录</ElButton
          >
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>
