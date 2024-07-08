<script setup lang="ts">
import {
  RESUME_ITEM_STEP,
  WEEKLY_FREQUENCY,
  BIWEEKLY_FREQUENCY,
  AVAILABILITY_STEP,
} from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const emit = defineEmits(['goToStep'])
const { shoppingCart } = useShoppingCartState()
const setFrequency = (frequency: string) => shoppingCart.value.currentItem.frequency = frequency

const goBack = () => {
  emit('goToStep', BOX_STEP)
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[20%] 2xl:px-[20%] relative">
    <div class="flex items-center justify-center gap-3">
      <div class="!absolute left-5 flex flex-row gap-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="goBack"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
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
        @click.prevent="setFrequency(WEEKLY_FREQUENCY)"
      />
      <Button
        outlined
        severity="secondary"
        :label="$t('orderItemFrequency.option3')"
        @click.prevent="setFrequency(BIWEEKLY_FREQUENCY)"
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
        v-if="shoppingCart.currentItem?.frequency"
        class="mt-4"
        severity="secondary"
        :label="$t('order.next')"
        @click.prevent="(emit('goToStep', RESUME_ITEM_STEP))"
      />
    </div>
  </div>
</template>
