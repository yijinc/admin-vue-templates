<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import { useSidebarStore } from '@/stores/sidebar'
import Header from './Header.vue'
import Sidebar from './Sidebar'

const sidebar = useSidebarStore()
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader class="bg-[var(--header-bg-color)] text-[var(--header-text-color)]">
      <Header />
    </ElHeader>
    <ElContainer>
      <ElAside :class="`${sidebar.collapse ? 'w-auto' : 'w-64'} transition-all duration-300`">
        <Sidebar />
      </ElAside>
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
