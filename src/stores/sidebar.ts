import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const collapse = ref(false)

  const toggleSidebar = () => {
    collapse.value = !collapse.value
  }

  return { collapse, toggleSidebar }
})
