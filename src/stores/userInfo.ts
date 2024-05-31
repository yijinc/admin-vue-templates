import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { fetchUserInfo } from '@/apis/user'
import type { IUser } from '@/apis/user.d'

export const useUserInfoStore = defineStore('userInfo', () => {
  const info = reactive<IUser>({
    id: 0,
    username: '',
    nickname: '',
    phone: '',
    email: '',
    avatar: '',
    enabled: false
  })

  const getInfo = () => {
    fetchUserInfo().then((res) => Object.assign(info, res))
  }

  return { info, getInfo }
})
