<script setup lang="ts">
const { item } = defineProps<{
  item: {
    id: string
    label: string
    path: string
    childrens: {
      id: string
      label: string
      path: string
    }[]
  }
}>()
</script>

<template>
  <div v-bind="$attrs">
    <h4 class="text-[1.125rem] mb-4 font-extrabold uppercase">
      {{ item.label }}
    </h4>
    <NuxtLink
      v-for="child in item.childrens"
      :key="child.id"
      class="flex flex-col my-3 leading-6 font-normal text-[0.9375rem]"
      :to="child.path"
    >
      {{ child.label }}
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss"></style>
