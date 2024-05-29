import { defineComponent, type DefineComponent } from 'vue'
import { useRoute, type RouteRecordRaw } from 'vue-router'
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import { useSidebarStore } from '@/stores/sidebar'
import { routes } from '@/router'

interface IMenuItem {
  title: string
  index: string // route path
  icon?: string
  children?: IMenuItem[]
  router?: RouteRecordRaw
}

const routes2menus = (routes: RouteRecordRaw[]) => {
  const menus: IMenuItem[] = []
  for (const route of routes) {
    if (route.meta?.title) {
      const menu: IMenuItem = {
        title: route.meta?.title as string,
        icon: route.meta?.icon as string,
        index: route.path
      }
      if (Array.isArray(route.children) && route.children.length > 0) {
        menu.children = routes2menus(route.children)
      }
      menus.push(menu)
    }
  }
  return menus
}

const renderIcon = (icon?: string) => {
  if (!icon) {
    return null
  }
  const IconComp = (ElementPlusIcons as unknown as { [key: string]: DefineComponent })[icon]
  return (
    <ElIcon size={20}>
      <IconComp />
    </ElIcon>
  )
}

// 递归渲染菜单
const renderMenu = (list: IMenuItem[]) => {
  return list.map((item) => {
    // 如果没有子菜单，使用 el-menu-item 渲染菜单项
    if (!item.children?.length) {
      return (
        <ElMenuItem index={item.index}>
          {renderIcon(item.icon)}
          <span>{item.title}</span>
        </ElMenuItem>
      )
    }

    // 有子菜单，使用 el-sub-menu 渲染子菜单
    // el-sub-menu 的插槽（title 和 default）
    const slots = {
      title: () => (
        <>
          {renderIcon(item.icon)}
          <span>{item.title}</span>
        </>
      ),
      default: () => renderMenu(item.children || [])
    }

    return <ElSubMenu index={item.index} v-slots={slots} />
  })
}

export default defineComponent({
  setup() {
    const adminRoutes = routes.find((i) => i.name === 'admin')?.children || []
    const adminMenus = routes2menus(adminRoutes)
    const route = useRoute()
    const sidebar = useSidebarStore()

    return () => (
      <ElMenu
        class="h-full border-t"
        collapse={sidebar.collapse}
        defaultActive={route.path}
        defaultOpeneds={['/system']}
        router
        popperEffect="dark"
        textColor="#bfcbd9"
        backgroundColor="#324157"
      >
        {renderMenu(adminMenus)}
      </ElMenu>
    )
  }
})
