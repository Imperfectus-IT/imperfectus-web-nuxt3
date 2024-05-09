<script setup lang="ts">
defineProps<{
  errors?: object[]
}>()
</script>

<template>
  <div class="flex flex-col flex-wrap">
    <slot />
    <small
      v-for="error in errors"
      :key="error"
      class="text-red-primary text-xs mt-1"
    >
      {{ error }}
    </small>
  </div>
</template>
