<script setup lang="ts">
import type { Item } from '~/composables/shopping_cart/types/ShoppingCartType.ts'
import { SUBSCRIPTION_TYPE, ORDER_TYPE } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const { item } = defineProps<{
  item: Item
}
>()
const showForSubscription = computed(() => item.purchaseType === SUBSCRIPTION_TYPE && item.boxSize)
const showForOrder = computed(() => item.purchaseType === ORDER_TYPE && item)
</script>

<template>
  <Panel
    :header="$t('purchase_summary.title')"
    toggleable
    collapsed
    :pt="{
      header: '!bg-beige-primary',
      content: '!bg-beige-primary',
    }"
    :pt-options="{
      mergeSections: true,
      mergeProps: true,
    }"
  >
    <template #header>
      <span class="font-solina-extended-medium text-base font-medium">{{ $t('purchase_summary.title') }}</span>
      <span
        v-if="item?.boxProduct"
        class="font-solina-extended-medium text-base font-medium"
      >{{ item.boxProduct.price }}€</span>
    </template>
    <template #togglericon="{ collapsed }">
      <span :class="[collapsed ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down', 'rounded-full border border-green-tertiary bg-green-primary h-[32px] w-[32px] text-[22px]']" />
    </template>
    <div class="py-3">
      <div
        v-if="showForSubscription || showForOrder"
        class="flex gap-3"
      >
        <NuxtImg
          class="rounded-lg"
          width="90"
          height="80"
          format="webp"
          alt="Caixa-S"
          fit="cover"
          src="/images/boxes/Caixa-S.webp"
        />
        <div class="my-auto">
          <span class="text-xs leading-3">{{ $t('purchase_summary.fromPrice') }}</span>
          <span class="text-xs font-bold">{{ item?.boxProduct?.price }}</span>
          <p class="text-xs leading-3">
            {{ item?.boxProduct?.description }}
          </p>
        </div>
      </div>
      <Divider class="opacity-50" />
      <div class="flex justify-between">
        <span class="text-xs leading-3">{{ $t('purchase_summary.frequency') }}</span>
        <span class="text-xs leading-3">{{ item?.frequency ?$t(`boxes.frequency.${item?.frequency}`) : '-' }}</span>
      </div>
      <div class="flex justify-between mt-3">
        <span class="text-xs leading-3">{{ $t('purchase_summary.boxSize') }}</span>
        <span class="text-xs leading-3">{{ item?.boxSize ? $t(`order.steps.stepBoxDetail.${item?.boxSize}`) : '-' }}</span>
      </div>
      <div class="flex justify-between mt-3">
        <span class="text-xs leading-3">{{ $t('purchase_summary.boxType') }}</span>
        <span class="text-xs leading-3">{{ item.boxType ? $t(`string.box.${item.boxType}`) : '-' }}</span>
      </div>
      <div class="flex justify-between mt-3">
        <span class="text-xs leading-3 grow">{{ $t('purchase_summary.exclusions') }}</span>
        <span class="text-xs leading-3 w-[30%]">Boniato, Pepino, Manzana, Mango, Lechuga</span>
      </div>
      <Divider class="opacity-50" />
      <div class="flex justify-between mt-3 font-solina-extended-medium">
        <span class="text-xl leading-3">{{ $t('purchase_summary.total') }}</span>
        <span class="text-xl leading-3">{{ item?.amount }}</span>
      </div>
      <Divider class="opacity-50" />
    </div>
  </Panel>
</template>
