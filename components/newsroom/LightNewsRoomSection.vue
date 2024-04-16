<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
<template>
  <section class="mt-5 text-center lg:mt-14">
    <div class="px-8">
      <h3 class="font-recoleta-regular text-xl font-normal lg:text-[3rem]">{{ title }}</h3>
      <p v-if="description" class="font-light text-base mt-4 lg:mt-8 lg:px-80 xl:px-[40%] ">{{ description }}</p>
      <slot />
    </div>
  </section>
</template>
