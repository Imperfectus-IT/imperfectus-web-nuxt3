<template>
  <hr
    :class="`mt-4 border-t-2 border-${color}`"
  >
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  color: {
    type: String,
    default: 'green-primary'
  }
})
</script>