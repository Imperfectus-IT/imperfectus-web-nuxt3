<template>
  <div class="lg:mt-12">
    Next deliveries
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta/suscripciones/proximas-entregas/[id]",
    ca: "/el-meu-compte/subscripcions/properes-entregues/[id]",
  },
});

</script>
