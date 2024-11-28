<script setup lang="ts">
const { shoppingCart } = useShoppingCartState()
const floatingItems: ComputedRef<ShoppingCartItem[]> = computed(() => {
  const hiddenSteps = [AUTH_STEP, RESUME_ITEM_STEP, DELIVERY_STEP, PAYMENT_STEP, SHIPPING_STEP]
  return [...shoppingCart.value.items, ...(hiddenSteps.includes(shoppingCart.value.step) ? [] : [shoppingCart.value.currentItem as ShoppingCartItem])]
})

const getPricesWithoutDiscount = computed(() => {
  let itemsTotal = 0
  if (shoppingCart.value.items.length > 0) {
    itemsTotal = shoppingCart.value.items.reduce((acc, item) => acc + item.product?.priceWithTax, 0)
  }
  return (itemsTotal + shoppingCart.value.currentItem.product?.priceWithTax || 0).toFixed(2)
})
</script>

<template>
  <Panel
    class="rounded-tl-lg rounded-tr-lg bg-beige-primary w-full"
    :header="$t('purchase_summary.title')"
    toggleable
    collapsed
    :pt="{
      header: 'h-20',
    }"
    :pt-options="{
      mergeSections: true,
      mergeProps: true,
    }"
  >
    <template #header>
      <span class="font-solina-extended-medium text-base font-medium">{{ $t('purchase_summary.title') }}</span>
    </template>
    <template #togglericon="{ collapsed }">
      <span :class="[collapsed ? 'mdi mdi-chevron-down' : 'mdi mdi-chevron-up', 'rounded-full border border-green-tertiary bg-green-primary h-[32px] w-[32px] text-[22px]']" />
    </template>
    <div class="py-3 flex flex-col max-h-[80vh] overflow-y-auto">
      <div
        v-for="item in floatingItems"
        :key="item.uuid"
        class="flex flex-col"
      >
        <div
          v-if="item.product"
          class="flex gap-3"
        >
          <NuxtImg
            class="rounded-lg !w-[120px]"
            format="webp"
            alt="Caixa-S"
            fit="cover"
            :src="item.product.image"
          />
          <div class="my-auto w-3/4">
            <span class="text-xs leading-3">{{ $t('purchase_summary.fromPrice') }}</span>
            <span class="text-xs font-bold">{{ item?.product?.priceWithTax + '€' }}</span>
            <p class="text-xs leading-4">
              {{ item?.product?.descriptionEs }}
            </p>
          </div>
        </div>
        <Divider
          v-if="item?.product"
          class="opacity-50"
        />
        <div class="flex justify-between mt-3">
          <span class="text-xs leading-3">{{ $t('purchase_summary.frequency') }}</span>
          <span class="text-xs leading-3">{{ item?.frequency ?$t(`boxes.frequency.${item?.frequency}`) : '-' }}</span>
        </div>
        <div class="flex justify-between mt-3">
          <span class="text-xs leading-3">{{ $t('purchase_summary.boxSize') }}</span>
          <span class="text-xs leading-3">{{ item?.boxSize ? $t(`order.steps.stepBoxDetail.${item?.boxSize}`) : '-' }}</span>
        </div>
        <div class="flex justify-between mt-3">
          <span class="text-xs leading-3">{{ $t('purchase_summary.boxType') }}</span>
          <span class="text-xs leading-3">{{ item?.boxType ? $t(`string.box.${item?.boxType}`) : '-' }}</span>
        </div>
        <div class="flex justify-between mt-3">
          <span class="text-xs leading-3 grow">{{ $t('purchase_summary.exclusions') }}</span>
          <span class="text-xs leading-3 text-end w-[30%]">{{ item.exclusions.length }}</span>
        </div>
        <Divider class="opacity-50" />
      </div>
      <div class="flex justify-between">
        <span>{{ $t('orderAmount.subtotal') }}</span>
        <span>{{ getPricesWithoutDiscount }}€</span>
      </div>
      <div class="flex justify-between mt-2">
        <span>{{ $t('orderAmount.shippingCost') }}</span>
        <span>{{ shoppingCart.amount.shippingCost }}€</span>
      </div>
      <div class="flex justify-between mt-2">
        <span>{{ $t('orderAmount.discount') }} <span v-if="shoppingCart?.items[0]?.coupon">(</span>{{ shoppingCart?.items[0]?.coupon?.discountValue }}<span v-if="shoppingCart?.items[0]?.coupon">%)</span></span>
        <span :class="shoppingCart.amount.saved > 0 ? 'text-green-secondary' : ''"><span v-if="shoppingCart?.items[0]?.coupon">-</span>{{ shoppingCart.amount.saved }}€</span>
      </div>
      <Divider class="opacity-50" />
      <div class="flex justify-between mt-3 font-solina-extended-medium">
        <span class="text-xl leading-3">{{ $t('purchase_summary.total') }}</span>
        <span class="text-xl leading-3">{{ shoppingCart.amount.total+'€' }}</span>
      </div>
      <Divider class="opacity-50" />
    </div>
  </Panel>
</template>
