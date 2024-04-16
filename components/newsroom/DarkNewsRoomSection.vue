<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
<template>
  <section class="bg-green-tertiary text-green-quaternary text-center py-8 lg:py-14">
    <div class="px-8">
      <h3 class="font-recoleta-regular text-xl font-normal lg:text-[3rem]">{{ title }}</h3>
      <slot />
    </div>
  </section>
</template>
