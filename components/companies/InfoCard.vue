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
  <div class="flex flex-col items-center rounded-xl p-5 bg-green-primary">
    <p class="font-solina-extended-medium">{{ title }}</p>
    <p class="mt-6 text-center font-solina-extended-book">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
