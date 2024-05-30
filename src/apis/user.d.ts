export interface IUser {
  id: number
  /**
   * 用户名
   */
  username: string

  /**
   * 用户昵称
   */
  nickname: string

  /**
   * 手机号
   */
  phone: string

  /**
   * 邮箱
   */
  email: string

  /**
   * 头像
   */
  avatar: string

  /**
   * 帐号是否可用
   */
  enabled: boolean
}
