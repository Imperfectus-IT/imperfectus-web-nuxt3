<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta",
    ca: "/el-meu-compte",
  },
})
</script>

<template>
  <h2>Admin page</h2>
</template>
