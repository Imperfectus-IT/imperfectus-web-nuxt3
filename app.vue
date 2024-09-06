<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { executeGetAllProducts } = useGetAllStrapiProducts()
const { executeFindPublicReviews } = useFindPublicReviews()
const { products } = useProductsState()
const { reviews } = usePublicReviewsState()
onMounted(() => {
  products.value.boxProducts.length < 1 || products.value.itemProducts.length < 1 ? executeGetAllProducts() : console.log('Products already loaded')
  reviews.value.length < 1 ? executeFindPublicReviews() : console.log('Reviews already loaded')
})
</script>
