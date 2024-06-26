<template>
  <h2>Calendar</h2>
  <Calendar
    v-model="date"
    inline
  />
</template>

<script setup lang="ts">
const date = ref()
</script>
