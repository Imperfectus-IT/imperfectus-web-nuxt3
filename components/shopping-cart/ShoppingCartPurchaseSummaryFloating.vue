<script setup lang="ts">
// const showForSubscription = computed(() => item?.purchaseType === SUBSCRIPTION_TYPE && item.boxSize)
// const showForOrder = computed(() => item?.purchaseType === ORDER_TYPE && item)
// const exclusionLists = computed(() => {
//   return item.exclusions.map(exclusion => exclusion?.name).join(', ') || '-'
// })

const { shoppingCart } = useShoppingCartState()
</script>

<template>
  <Panel
    class="rounded-tl-lg rounded-tr-lg bg-beige-primary w-1/4"
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
      <!--      <span -->
      <!--        v-if="item?.boxProduct" -->
      <!--        class="font-solina-extended-medium text-base font-medium" -->
      <!--      >{{ item.boxProduct.price }}€</span> -->
    </template>
    <template #togglericon="{ collapsed }">
      <span :class="[collapsed ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down', 'rounded-full border border-green-tertiary bg-green-primary h-[32px] w-[32px] text-[22px]']" />
    </template>
    <div class="py-3 flex flex-col">
      <div
        v-for="item in shoppingCart.items"
        :key="item.uuid"
        class="flex flex-row gap-3"
      >
        <div>
          <NuxtImg
            class="rounded-lg w-[120px]"
            format="webp"
            alt="Caixa-S"
            fit="cover"
            :src="item.product.image"
          />
          <div class="my-auto">
            <span class="text-xs leading-3">{{ $t('purchase_summary.fromPrice') }}</span>
            <span class="text-xs font-bold">{{ item?.product?.price }}</span>
            <p class="text-xs leading-3">
              {{ item?.product?.descriptionEs }}
            </p>
          </div>
        </div>
        <!--        <Divider -->
        <!--          v-if="item?.product" -->
        <!--          class="opacity-50" -->
        <!--        /> -->
        <!--        <div class="flex justify-between mt-3"> -->
        <!--          <span class="text-xs leading-3">{{ $t('purchase_summary.frequency') }}</span> -->
        <!--          <span class="text-xs leading-3">{{ item?.frequency ?$t(`boxes.frequency.${item?.frequency}`) : '-' }}</span> -->
        <!--        </div> -->
        <!--        <div class="flex justify-between mt-3"> -->
        <!--          <span class="text-xs leading-3">{{ $t('purchase_summary.boxSize') }}</span> -->
        <!--          <span class="text-xs leading-3">{{ item?.boxSize ? $t(`order.steps.stepBoxDetail.${item?.boxSize}`) : '-' }}</span> -->
        <!--        </div> -->
        <!--        <div class="flex justify-between mt-3"> -->
        <!--          <span class="text-xs leading-3">{{ $t('purchase_summary.boxType') }}</span> -->
        <!--          <span class="text-xs leading-3">{{ item?.boxType ? $t(`string.box.${item?.boxType}`) : '-' }}</span> -->
        <!--        </div> -->
        <!--        <div class="flex justify-between mt-3"> -->
        <!--          <span class="text-xs leading-3 grow">{{ $t('purchase_summary.exclusions') }}</span> -->
        <!--          <span class="text-xs leading-3 text-end w-[30%]">{{ item.exclusions.length }}</span> -->
        <!--        </div> -->
        <!--        <Divider class="opacity-50" /> -->
      </div>
      <div class="flex justify-between mt-3 font-solina-extended-medium">
        <span class="text-xl leading-3">{{ $t('purchase_summary.total') }}</span>
        <!--        <span class="text-xl leading-3">{{ item?.amount }}</span> -->
      </div>
      <Divider class="opacity-50" />
    </div>
  </Panel>
</template>
