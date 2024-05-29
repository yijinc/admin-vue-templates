<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar } from 'element-plus'
import { Expand, Fold, Bell, ArrowDown, User, SwitchButton } from '@element-plus/icons-vue'
import { useSidebarStore } from '@/stores/sidebar'

const router = useRouter()
const sidebar = useSidebarStore()
const handleCommand = (command: 'logout' | 'info') => {
  if (command === 'logout') {
    router.push('/login')
  }
  if (command === 'info') {
    router.push('/setting/personal-info')
  }
}
</script>

<template>
  <div class="w-full h-16 flex items-center justify-between">
    <!-- left -->
    <div class="flex items-center pr-5">
      <img class="w-10" src="../assets/logo.svg" alt="logo" />
      <div class="text-2xl ml-2 mr-10">后台管理系统</div>
      <div
        class="flex items-center justify-center px-2 cursor-pointer text-xl"
        @click="sidebar.toggleSidebar"
      >
        <ElIcon :size="20">
          <Expand v-if="sidebar.collapse" />
          <Fold v-else />
        </ElIcon>
      </div>
    </div>
    <!-- right -->
    <div class="flex items-center">
      <ElIcon :size="20" class="mr-4">
        <Bell />
      </ElIcon>
      <ElDropdown @command="handleCommand" trigger="click">
        <div class="flex items-center mr-2">
          <ElAvatar />
          <span class="ml-2">管理员</span>
          <ElIcon :size="20">
            <ArrowDown />
          </ElIcon>
        </div>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem command="info">
              <ElIcon :size="16"><User /></ElIcon>
              个人信息
            </ElDropdownItem>
            <ElDropdownItem divided command="logout">
              <ElIcon :size="16"><SwitchButton /></ElIcon>
              退出登录
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>
