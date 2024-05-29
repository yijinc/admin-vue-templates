import axios from 'axios'
import { ElMessage } from 'element-plus'
import type {
  Axios,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

interface IRequestConfig<D = any> extends AxiosRequestConfig<D> {
  silent?: boolean // silent 默认为 false（undefined），统一错误弹窗，手动置true为自定义处理错误，不弹窗
}

interface IRequesInstancce extends Axios {
  <T, R, D>(config: IRequestConfig<D>): Promise<T>
  <T, R, D>(url: string, config?: IRequestConfig<D>): Promise<T>
  get<T, R, D>(url: string, config?: IRequestConfig<D>): Promise<T>
  get<T, R, D>(url: string, config?: IRequestConfig<D>): Promise<T>
  post<T, R, D>(url: string, data?: D, config?: IRequestConfig<D>): Promise<T>
  put<T, R, D>(url: string, data?: D, config?: IRequestConfig<D>): Promise<T>
  delete<T, R, D>(url: string, config?: IRequestConfig<D>): Promise<T>
}

class RequestError extends Error {
  code: number = 1
  message: string = '请求失败'
  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
}) as IRequesInstancce

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
    if (!error.request.silent) {
      ElMessage.error('登录失败')
    } else {
      return Promise.reject(error)
    }
  }
)

export default instance
