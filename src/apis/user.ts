import request from '@/utils/request'
import type { IUser } from './user.d'

export const login = (data: { username: string; password: string }) =>
  request<string>({
    method: 'POST',
    url: '/login',
    data,
    silent: true // 关闭统一错误弹窗，调用方处理异常
  })

export const fetchUserInfo = () =>
  request<IUser>({
    method: 'GET',
    url: '/user/info'
  })

export const fetchUserList = (params: { username?: string; enabled?: boolean }) =>
  request<IPage<IUser>>({
    method: 'GET',
    url: '/user/list',
    params
  })
