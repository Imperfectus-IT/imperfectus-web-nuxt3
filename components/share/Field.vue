<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps<{
  errors?: object[];
}>();
</script>
<template>
  <div class="flex flex-col flex-wrap">
    <slot />
    <small
      v-for="(error, index) in errors"
      :key="index"
      class="text-red-primary text-xs"
    >
      {{ error }}
    </small>
  </div>
</template>
