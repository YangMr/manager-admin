<template>
  <el-container class="layout">
    <el-aside class="aside" width="210px">
      <div class="logo">
        <img
          src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
          alt=""
        />
        <span>物业管理系统 </span>
      </div>
      <FMenu></FMenu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <FHeader></FHeader>
      </el-header>
      <el-main>
        <FTagList></FTagList>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTagList.vue'
</script>

<style lang="scss">
.layout {
  height: 100%;
}
.aside {
  background-color: rgb(48, 65, 86);

  .logo {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    text-align: center;
    overflow: hidden;
    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    span {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      vertical-align: middle;
    }
  }
}
.header {
  height: 50px;
  background-color: purple;
}
</style>
