<script setup lang="ts">
import type { ListItemTypes } from "~/components/companies/ListItem/ListItemTypes.ts";

withDefaults(defineProps<ListItemTypes>(), {
  text: "",
  textClass: "",
});
</script>

<template>
  <div class="flex items-center gap-x-4">
    <span class="text-green-primary">⬤</span>
    <span :class="textClass">
      {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss"></style>
