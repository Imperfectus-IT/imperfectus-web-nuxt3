<script setup lang="ts">
import { useGetLocaleLanguage } from '~/composables/shared/useGetLocaleLanguage.ts'

defineProps<{
  boxProduct: BoxProduct
}>()
const { locale } = useI18n()
const { getLocaleName } = useGetLocaleLanguage(locale.value)
</script>

<template>
  <div class="lg:flex lg:flex-row lg:justify-center lg:mt-10">
    <NuxtImg
      class="rounded-lg w-full lg:w-[350px]"
      :src="boxProduct?.image"
      :alt="boxProduct?.nameEs"
      format="webp"
      preload
    />
    <div class="lg:my-auto lg:text-[20px] lg:w-1/2 lg:p-8">
      <div class="flex justify-between items-center font-bold px-1 my-3">
        <span>{{ boxProduct[`name${getLocaleName}`] }}</span>
        <span>{{ boxProduct?.priceWithTax }} €</span>
      </div>
      <p class="text-base leading-6 font-extralight lg:mt-10">
        {{ boxProduct[`description${getLocaleName}`] }}
      </p>
    </div>
  </div>
</template>
