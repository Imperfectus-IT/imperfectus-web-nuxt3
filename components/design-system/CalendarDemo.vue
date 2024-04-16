<template>
  <section class="flex flex-wrap gap-3 mt-3">
    <h2>Calendar</h2>
    <Calendar v-model="date" inline />
  </section>
</template>
<script setup lang="ts">
const date = ref();
</script>
