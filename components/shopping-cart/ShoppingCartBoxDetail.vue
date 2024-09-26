<script setup lang="ts">
import type {ProductDetail} from "~/composables/shopping-cart/domain/Product.ts";

defineProps<{
  boxProduct: ProductDetail
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
      <div class="flex justify-between items-center font-bold px-1 my-3">
        <span>{{ boxProduct?.name }}</span>
        <span>{{ boxProduct?.price }} €</span>
      </div>
      <p class="text-base leading-6 font-extralight lg:mt-10">
        {{ boxProduct?.description }}
      </p>
    </div>
  </div>
</template>
