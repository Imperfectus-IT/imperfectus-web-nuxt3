<script setup lang="ts">
import type { ListItemTypes } from '~/components/companies/ListItem/ListItemTypes.ts'

withDefaults(defineProps<ListItemTypes>(), {
  text: '',
  textClass: '',
  dotClass: '',
  mainClass: '',
})
</script>

<template>
  <div :class="mainClass ? mainClass : 'flex items-center gap-x-4' ">
    <span
      :class="dotClass"
      class="text-green-primary"
    >⬤</span>
    <p :class="textClass">
      {{ text }}
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
