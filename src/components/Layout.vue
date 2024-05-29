<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import Header from './Header.vue'
import Sidebar from './Sidebar'
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
      <ElMain class="bg-slate-100">
        <ElMain class="h-full bg-white overflow-y-auto">
          <RouterView />
        </ElMain>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
