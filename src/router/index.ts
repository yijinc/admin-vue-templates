import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout.vue'

/**
 * 通过 RouteRecord 的 meta 对象，自定义 title & icon
 * { title: '', icon: '' }
 * 如果有值，就作为 menu 导航
 * **/
const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    name: 'admin',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: '首页', icon: '' },
        component: () => import('../views/dashboard/index.vue')
      },
      {
        path: '/system',
        name: 'system',
        meta: { title: '系统管理', icon: '' },
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
        meta: { title: '个人设置', icon: '' },
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  next()
  // NProgress.start();
  // const role = localStorage.getItem('vuems_name');
  // const permiss = usePermissStore();

  // if (!role && to.meta.noAuth !== true) {
  //     next('/login');
  // } else if (typeof to.meta.permiss == 'string' && !permiss.key.includes(to.meta.permiss)) {
  //     // 如果没有权限，则进入403
  //     next('/403');
  // } else {
  //     next();
  // }
})

router.afterEach(() => {
  // NProgress.done();
})

export default router
