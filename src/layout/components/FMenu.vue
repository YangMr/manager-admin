<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="rgb(48, 65, 86)"
      default-active="2"
      text-color="#fff"
      style="width: 200px"
      router
    >
      <el-menu-item index="/dashboard">
        <span>首页</span>
      </el-menu-item>
      <template v-for="(item, index) in menuList" :key="index">
        <el-sub-menu
          v-if="item.children && item.children.length > 0"
          :index="item.path"
        >
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="(child, i) in item.children"
            :key="i"
            :index="child.path"
            >{{ child.meta.title }}</el-menu-item
          >
        </el-sub-menu>

        <el-menu-item v-else :index="item.path">
          <span>Navigator Four</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import component from '../../shims-vue'
const store = useStore()

const menuList = computed(() => store.state.menu)
</script>

<style lang="scss">
.el-menu {
  border-right: none;
}
</style>
