<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { executeGetAllProducts } = useGetAllStrapiProducts()
const { products } = useProductsState()
onMounted(() => {
  console.log('MOUNTED!', products.value.boxProducts.length, products.value.itemProducts.length)
  products.value.boxProducts.length < 1 || products.value.itemProducts.length < 1 ? executeGetAllProducts() : console.log('Products already loaded')
})
</script>
