<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { executeGetAllProducts } = useGetAllStrapiProducts()
const { products } = useProductsState()
onMounted(() => {
  console.log('mounted', products.value.length)
  products.value.length < 1 ? executeGetAllProducts() : ''
})
</script>
