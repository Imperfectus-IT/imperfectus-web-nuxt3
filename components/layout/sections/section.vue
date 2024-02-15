<template>
  <section
    class="bg-cover"
    :class="{'bg-cover py-24 px-6': isMedium}"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps({
  isMedium: {
    type: Boolean,
    default: false
  }
})
</script>
