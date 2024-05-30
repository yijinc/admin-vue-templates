/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface IResponseResult<T> {
  code: number
  message: string
  data: T
}

interface IPage<T> {
  records: T[]
  total: number
  size: number
  current: number
}
