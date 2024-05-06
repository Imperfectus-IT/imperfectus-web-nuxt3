<script setup lang="ts">
defineProps({
  label: String,
  value: String,
})
</script>

<template>
  <div class="flex flex-col items-center justify-between">
    <span class="text-center font-solina-extended-book text-[15px]">{{ label }}</span>
    <span class="font-recoleta-semibold text-[22px]">{{ value }}</span>
  </div>
</template>
