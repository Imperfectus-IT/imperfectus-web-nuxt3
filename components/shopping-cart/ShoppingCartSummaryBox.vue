<script setup lang="ts">
const { backButton } = defineProps({
  backButton: {
    type: Boolean,
    default: false,
  },
})
const { shoppingCart } = useShoppingCartState()
const incrementQuantity = (item) => {
  item.quantity += 1
}

const decrementQuantity = (item) => {
  const MIN_QUANTITY = 1
  return item.quantity === MIN_QUANTITY ? MIN_QUANTITY : item.quantity -= 1
}

const exclusionLists = (item) => {
  return item.exclusions.map(exclusion => exclusion?.name).join(', ') || '-'
}

const removeItem = (id: number) => {
  const index = shoppingCart.value.items.findIndex(item => item.id === id)
  shoppingCart.value.items.splice(index, 1)
}
</script>

<template>
  <div
    v-if="backButton"
    class="flex items-center justify-center gap-3 mt-4"
  >
    <div class="!absolute left-5 flex flex-row gap-3">
      <Button
        class="w-[2rem] h-[2rem] text-xl "
        icon="mdi mdi-chevron-left"
        rounded
        outlined
        @click.prevent="$emit('goBack')"
      />
      <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
    </div>
    <p class="font-recoleta-regular text-xl font-normal text-center lg:text-2xl">
      {{ $t('order.steps.orderItemResume') }}
    </p>
  </div>
  <slot name="title" />
  <div
    v-for="(item, index) in shoppingCart.items"
    :key="index"
    class="lg:flex mb-5 lg:mb-0 lg:gap-4 lg:flex-wrap"
  >
    <NuxtImg
      :src="'/images/boxes/Caixa-M.webp'"
      loading="lazy"
      format="webp"
      class="rounded-lg mt-6 w-full lg:w-[100px] lg:h-[100px]"
    />
    <div class="p-4 lg:my-auto lg:w-1/2 lg:p-0 lg:py-4 mt-5">
      <div class="flex justify-between items-center">
        <span class="font-bold my-3 lg:my-1 text-lg lg:text-base">{{ item.boxProduct?.name }}</span>
        <span class="font-bold text-lg inline lg:hidden">{{ item.boxProduct?.price }} €</span>
      </div>
      <p class="mt-6 lg:mt-3 lg:hidden">
        {{ item.boxProduct?.description }}
      </p>
      <ul class="list-square ml-5 text-base leading-7 mt-2 lg:mt-0 lg:text-xs lg:leading-[18px]">
        <li>{{ item?.frequency ?$t(`boxes.frequency.${item?.frequency}`) : '-' }}</li>
        <li>{{ item?.boxType ? $t(`string.box.${item?.boxType}`) : '-' }}</li>
        <li>{{ exclusionLists(item) }}</li>
      </ul>
      <span class="font-bold text-lg hidden lg:block lg:mt-2 lg:text-base">{{ item.boxProduct?.price }} €</span>
    </div>
    <div class="flex flex-row-reverse justify-between px-4 lg:flex-col lg:items-end lg:justify-around lg:gap-14">
      <span
        class="mdi mdi-close text-red-primary cursor-pointer"
        @click.prevent="removeItem(item.id)"
      />
      <div class="flex gap-2">
        <Button
          icon="mdi mdi-minus"
          outlined
          :pt="{
            root: ['h-4 w-7'],
          }"
          :pt-options="{
            mergeSections: true,
            mergeProps: true,
          }"
          @click.prevent="decrementQuantity(item)"
        />
        <span>{{ item.quantity }}</span>
        <Button
          icon="mdi mdi-plus"
          outlined
          :pt="{
            root: ['h-4 w-7'],
          }"
          :pt-options="{
            mergeSections: true,
            mergeProps: true,
          }"
          @click.prevent="incrementQuantity(item)"
        />
      </div>
    </div>
    <Divider class="text-grey-secondary" />
  </div>
  <Button
    :label="$t('orderResume.add')"
    outlined
  />
  <Divider class="text-grey-secondary" />
  <OrderCoupon
    :show-title="true"
  />
  <Divider class="text-grey-secondary mt-7" />
  <div class="flex justify-between">
    <span>{{ $t('orderAmount.subtotal') }}</span>
    <span>19.18€</span>
  </div>
  <div class="flex justify-between mt-2">
    <span>{{ $t('orderAmount.shippingCost') }}</span>
    <span>0,00€</span>
  </div>
  <div class="flex justify-between mt-2">
    <span>{{ $t('orderAmount.discount') }}</span>
    <span>0,00€</span>
  </div>
  <Divider class="text-grey-secondary" />
  <div class="flex justify-between text-[22px] font-solina-extended-medium">
    <span>{{ $t('orderAmount.total') }}</span>
    <span>19.18€</span>
  </div>
</template>
