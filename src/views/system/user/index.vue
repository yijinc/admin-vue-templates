<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  ElTable,
  ElTableColumn,
  vLoading,
  ElPagination,
  ElAvatar,
  ElSwitch,
  ElButton,
  ElDivider
} from 'element-plus'
import { fetchUserList } from '@/apis/user'
import type { IUser } from '@/apis/user.d'

const data = ref<IPage<IUser>>({
  records: [],
  total: 0,
  size: 20,
  current: 1
})
const loading = ref<boolean>(true)

const getData = (current = 1, size = 20) => {
  loading.value = true
  fetchUserList({ current, size }).then((res) => {
    data.value = res
    loading.value = false
  })
}

const handleSizeChange = (size: number) => {
  getData(1, size)
}

const handleCurrentChange = (current: number) => {
  getData(current, data.value.size)
}

onMounted(getData)
</script>
'
<template>
  <div v-loading="loading" style="height: calc(100vh - 140px)">
    <ElTable :data="data?.records" style="height: calc(100% - 52px)">
      <ElTableColumn prop="username" label="用户名" />
      <ElTableColumn prop="nickname" label="昵称" />
      <ElTableColumn prop="avatar" label="头像" :width="120">
        <template #default="{ row }">
          <ElAvatar :src="row.avatar" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="phone" label="手机号" />
      <ElTableColumn prop="email" label="邮箱" />
      <ElTableColumn prop="enabled" label="是否可用" :width="120">
        <template #default="{ row }">
          <ElSwitch v-model="row.enabled" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="id" label="操作">
        <template #default="{ row }">
          <ElButton text type="info">查看</ElButton>
          <ElDivider direction="vertical" />
          <ElButton text type="primary">编辑</ElButton>
          <ElDivider direction="vertical" />
          <ElButton text type="danger">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <div class="flex justify-center mt-5">
      <ElPagination
        v-model:current-page="data.current"
        v-model:page-size="data.size"
        :page-sizes="[10, 20, 30, 40]"
        :disabled="loading"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
