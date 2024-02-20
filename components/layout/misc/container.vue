<template>
  <div
      class="flex-grow mx-auto relative w-auto"
      :class="{
        'lg:max-w-[960px]': !isFull,
        'xl:max-w-[1152px]': !isFull,
        '2xl:max-w-[1344px]': !isFull,
      }"
  >

    <slot/>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  isFull: {
    type: Boolean,
    default: false,
  },
});

</script>
