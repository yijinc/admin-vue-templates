<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import { useUserInfoStore } from '@/stores/userInfo'
import Header from './Header.vue'
import Sidebar from './Sidebar'
const a = useUserInfoStore()
</script>

<template>
  <ElContainer class="h-screen">
    <ElHeader class="bg-[var(--header-bg-color)] text-[var(--header-text-color)]">
      <Header />
    </ElHeader>
    <ElContainer>
      <ElAside style="width: auto">
        <Sidebar />
      </ElAside>
      <ElMain class="bg-slate-100 overflow-y-auto" style="height: calc(100vh - 60px)">
        <ElMain class="bg-white">
          <RouterView />
        </ElMain>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
