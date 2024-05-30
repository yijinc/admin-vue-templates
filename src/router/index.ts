import { createRouter, createWebHistory, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/request'
import Layout from '@/components/Layout.vue'

/**
 * 通过 RouteRecord 的 meta 对象，自定义 title & icon
 * { title: '', icon: '' }
 * 如果有值，就作为 menu 导航
 * **/
export const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', redirect: !getToken() ? '/login' : '/system/user' },
  {
    path: '/',
    name: 'admin',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: '首页', icon: 'HomeFilled' },
        component: () => import('../views/dashboard/index.vue')
      },
      {
        path: '/system',
        name: 'system',
        meta: { title: '系统管理', icon: 'Grid' },
        children: [
          {
            path: '/system/app',
            name: 'system-app',
            meta: { title: '应用管理', icon: '' },
            component: () => import('../views/system/app/index.vue')
          },
          {
            path: '/system/user',
            name: 'system-user',
            meta: { title: '用户管理', icon: '' },
            component: () => import('../views/system/user/index.vue')
          },
          {
            path: '/system/role',
            name: 'system-role',
            meta: { title: '角色管理', icon: '' },
            component: () => import('../views/system/role/index.vue')
          },
          {
            path: '/system/permission',
            name: 'system-permission',
            meta: { title: '权限管理', icon: '' },
            component: () => import('../views/system/permission/index.vue')
          }
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        meta: { title: '个人设置', icon: 'Setting' },
        children: [
          {
            path: '/setting/personal-info',
            name: 'personal-info',
            meta: { title: '个人信息', icon: '' },
            component: () => import('../views/setting/personal-info/index.vue')
          },
          {
            path: '/setting/change-password',
            name: 'change-password',
            meta: { title: '修改密码', icon: '' },
            component: () => import('../views/setting/change-password/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
