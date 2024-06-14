<script setup lang="ts">
type BoxProductDetail = {
  name: string
  description: string
  price: string
  image: string
}
defineProps<{
  boxProduct: BoxProductDetail
}>()
</script>

<template>
  <div>
    <NuxtImg
        class="rounded-lg"
        :src="boxProduct?.image"
        :alt="boxProduct?.name"
        format="webp"
        preload
    />
    <div class="flex justify-between items-center font-bold my-3">
      <span>{{ boxProduct?.name }}</span>
      <span>{{ boxProduct?.price }}</span>
    </div>
    <p>{{ boxProduct?.description }}</p>
  </div>
</template>
