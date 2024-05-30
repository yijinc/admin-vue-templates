import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type {
  Axios,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface IRequestConfig extends AxiosRequestConfig {
  silent?: boolean // silent 默认为 false（undefined），统一错误弹窗，手动置true为自定义处理错误，不弹窗
}

interface IRequesInstancce extends Axios {
  <T>(config: IRequestConfig): Promise<T>
  <T>(url: string, config?: IRequestConfig): Promise<T>
  get<T>(url: string, config?: IRequestConfig): Promise<T>
  get<T>(url: string, config?: IRequestConfig): Promise<T>
  post<T>(url: string, data?: any, config?: IRequestConfig): Promise<T>
  put<T>(url: string, data?: any, config?: IRequestConfig): Promise<T>
  delete<T>(url: string, config?: IRequestConfig): Promise<T>
}

class RequestError extends Error {
  code: number = 1
  message: string = '请求失败'
  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

export const APP_TOKEN_KEY = 'app-token'
let token = localStorage.getItem(APP_TOKEN_KEY)

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: !token ? undefined : `Bearer ${token}`,
    appId: 'admin'
  }
}) as IRequesInstancce

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (token !== null) {
      config.headers.Authorization = 'Bearer ' + token
    }
    config.headers.timestap = Date.now()
    return config
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)

const errorsMap = new Map<number, string>([
  [401, '未授权'],
  [403, '拒绝访问'],
  [404, '接口路径不存在'],
  [500, '服务器内部错误'],
  [502, '服务不可用']
])

instance.interceptors.response.use(
  // @ts-ignore
  (response: AxiosResponse<IResponseResult<T>, D>) => {
    if (response.status === 200) {
      if (response.data.code === 0) {
        return response.data.data
      } else {
        return Promise.reject(new RequestError(response.data.code, response.data.message))
      }
    } else {
      return Promise.reject(
        new RequestError(response.status, errorsMap.get(response.status) || '请求失败')
      )
    }
  },
  (error: AxiosError) => {
    // @ts-ignore
    if (error.cocde === 401) {
      setToken(null)
      useRouter().replace('/login')
    }
    if (!error.request.silent) {
      ElMessage.error('登录失败')
    } else {
      return Promise.reject(error)
    }
  }
)

export const getToken = () => token
export const setToken = (t: string | null) => {
  token = t
  if (t === null) {
    localStorage.removeItem(APP_TOKEN_KEY)
  } else {
    localStorage.setItem(APP_TOKEN_KEY, t)
  }
}

export default instance
