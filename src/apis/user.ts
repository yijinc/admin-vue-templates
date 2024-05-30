import request from '@/utils/request'
import type { IUser } from './user.d'

const delay = (ms?: number) => new Promise((resolve) => setTimeout(resolve, ms || 0))

export const login = (data: { username: string; password: string }) => {
  //   return request<string>({
  //     method: 'POST',
  //     url: '/login',
  //     data,
  //     silent: true // 关闭统一错误弹窗，调用方处理异常
  //   })
  // mock
  return delay(500).then(() => 'token:123')
}

export const fetchUserInfo = () => {
  //   return request<IUser>({
  //     method: 'GET',
  //     url: '/user/info'
  //   })
  // mock
  const result: IUser = {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    phone: '13888888888',
    email: 'example@163.com',
    avatar: 'https://avatars.githubusercontent.com/u/8774441',
    enabled: true
  }
  return delay().then(() => result)
}

export const fetchUserList = (params?: {
  current?: number
  size?: number
  username?: string
  enabled?: boolean
}) => {
  //   return request<IPage<IUser>>({
  //     method: 'GET',
  //     url: '/user/list',
  //     params
  //   })
  // mock
  const result: IPage<IUser> = {
    total: 136,
    current: params?.current || 1,
    size: params?.size || 20,
    records: []
  }
  for (let index = 0; index < result.size; index++) {
    const user: IUser = {
      id: 10000 + index,
      username: 'faker' + index,
      nickname: '韩信' + index,
      phone: '13888888888' + index,
      email: `example${index}@163.com`,
      avatar: 'https://avatars.githubusercontent.com/u/8774441',
      enabled: true
    }
    result.records.push(user)
  }
  return delay(800).then(() => result)
}
