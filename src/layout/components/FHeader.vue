<template>
  <div>
    <template v-for="(item, index) in bream" :key="index">
      <span v-if="item.children && item.children.length > 0">{{
        item.children[0].meta.title
      }}</span>
      <span v-else>{{ item.meta.title }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

console.log(route)
const bream = computed(() => route.matched)
</script>

<style lang="sss"></style>
