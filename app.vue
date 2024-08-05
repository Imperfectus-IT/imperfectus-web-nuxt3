<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { executeGetAllProducts } = useGetAllStrapiProducts()
const { products } = useProductsState()
onMounted(() => {
  products.value.length < 1 ? executeGetAllProducts() : ''
})
</script>
