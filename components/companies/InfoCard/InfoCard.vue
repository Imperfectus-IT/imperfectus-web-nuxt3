<script setup lang="ts">
import type { InfoCardTypes } from './InfoCardTypes.ts'

defineProps<InfoCardTypes>()
</script>

<template>
  <div class="flex flex-col items-center rounded-lg p-4 bg-green-primary">
    <p class="text-base font-solina-extended-medium">
      {{ title }}
    </p>
    <p
      v-if="description"
      class="mt-4 text-center text-base font-solina-extended-book"
    >
      {{ description }}
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
