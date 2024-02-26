<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="flex flex-col items-center rounded-xl px-8 py-4 bg-green-primary">
    <p class="text-base font-solina-extended-medium">{{ title }}</p>
    <p class="mt-4 text-center text-base font-solina-extended-book">
      {{ description }}
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
