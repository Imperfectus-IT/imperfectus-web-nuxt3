<script setup lang="ts">
import { RESUME_ITEM_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const emit = defineEmits(['goToStep'])
const { shoppingCart } = useShoppingCartState()
const setFrequency = (frequency: string) => shoppingCart.value.frequency = frequency
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[20%] 2xl:px-[20%]">
    <div class="flex items-center justify-center gap-3">
      <Button
        class="w-[2rem] h-[2rem] text-xl !absolute left-5"
        icon="mdi mdi-chevron-left"
        rounded
        outlined
      />
      <p class="font-recoleta-regular text-lg font-normal text-center w-2/3 lg:text-2xl lg:w-full">
        {{
          $t('order.steps.stepCustomize.frequency')
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-6 lg:flex-row lg:justify-center">
      <Button
        outlined
        :label="$t('orderItemFrequency.option2')"
        @click.prevent="setFrequency('weekly')"
      />
      <Button
        outlined
        severity="secondary"
        :label="$t('orderItemFrequency.option3')"
        @click.prevent="setFrequency('biweekly')"
      />
    </div>
    <NuxtImg
      src="/images/steps/frequency/frequency.webp"
      format="webp"
      loading="lazy"
      alt="frequency_img"
      class="hidden lg:block mx-auto"
    />
    <div class="flex justify-center mt-5">
      <Button
        v-if="shoppingCart.frequency"
        class="mt-4"
        severity="secondary"
        :label="$t('order.next')"
        @click.prevent="(emit('goToStep', RESUME_ITEM_STEP))"
      />
    </div>
  </div>
</template>
