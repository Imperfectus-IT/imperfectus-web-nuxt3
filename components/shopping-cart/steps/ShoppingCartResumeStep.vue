<script setup lang="ts">
import { SHIPPING_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const { shoppingCart } = useShoppingCartState()
const emit = defineEmits(['goToStep'])
const goToNextStep = () => {
  const user = useStrapiUser()
  user ? emit('goToStep', SHIPPING_STEP) : emit('goToStep', AUTH_STEP)
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[25%] 2xl:px-[20%]">
    <div class="flex items-center justify-center gap-3 mt-4 relative">
      <Button
        class="w-[2rem] h-[2rem] text-xl !absolute left-0"
        icon="mdi mdi-chevron-left"
        rounded
        outlined
      />
      <p class="font-recoleta-regular text-xl font-normal text-center lg:text-2xl">
        {{ $t('order.steps.orderItemResume') }}
      </p>
    </div>
    <div class="lg:flex lg:flex-row">
      <NuxtImg
        :src="'/images/boxes/Caixa-M.webp'"
        loading="lazy"
        format="webp"
        class="rounded-lg mt-6 lg:w-1/2"
      />
      <div class="px-4 lg:my-auto lg:w-1/2">
        <div class="flex justify-between items-center font-bold my-3 text-lg ">
          <span>Caja Pequeña</span>
          <span>19.18€</span>
        </div>
        <p class="mt-10 lg:mt-3">
          Ideal para 1-2 personas. Contiene entre 6-7 kg de fruta y verdura.
        </p>
      </div>
    </div>
    <Divider class="text-grey-secondary" />
    <Button
      :label="$t('orderResume.add')"
      outlined
      class="lg:mb-8"
    />
    <Divider class="lg:hidden text-grey-secondary mb-7" />
    <OrderCoupon
      :show-title="false"
    />
    <Divider class="text-grey-secondary mt-7" />
    <div class="flex justify-between">
      <span>Subtotal</span>
      <span>19.18€</span>
    </div>
    <div class="flex justify-between mt-2">
      <span>Gastos de envío</span>
      <span>0,00€</span>
    </div>
    <Divider class="text-grey-secondary" />
    <div class="flex justify-between text-[22px] font-solina-extended-medium">
      <span>Total</span>
      <span>19.18€</span>
    </div>
    <div class="flex justify-center">
      <Button
        :label="$t('order.next')"
        severity="secondary"
        class="mt-4"
        @click.prevent="goToNextStep()"
      />
    </div>
  </div>
</template>
