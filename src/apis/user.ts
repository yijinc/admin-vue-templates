import request from '@/utils/request'

export const fetchUserInfo = () => request.get('/user/info')
