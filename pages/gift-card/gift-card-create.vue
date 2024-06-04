<template>
  <GiftCardDescriptions />
  <GiftCardCreate />
  <GiftCardDoubts />
</template>

<script setup lang="ts">
defineI18nRoute({
  paths: {
    es: "/tarjeta-regalo-digital/crear",
    ca: "/targeta-regal-digital/crear",
  },
});
</script>
