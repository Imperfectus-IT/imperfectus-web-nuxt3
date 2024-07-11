<script setup lang="ts">
export type BoxProductDetail = {
  id: number
  sku: string
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
  <div class="lg:flex lg:flex-row lg:justify-center lg:mt-10">
    <NuxtImg
      class="rounded-lg w-full lg:w-[350px]"
      :src="boxProduct?.image"
      :alt="boxProduct?.name"
      format="webp"
      preload
    />
    <div class="lg:my-auto lg:text-[20px] lg:w-1/2 lg:p-8">
      <div class="flex justify-between items-center font-bold my-3">
        <span>{{ boxProduct?.name }}</span>
        <span>{{ boxProduct?.price }}</span>
      </div>
      <p>{{ boxProduct?.description }}</p>
    </div>
  </div>
</template>
