<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { OrderBilling } from '~/composables/admin/orders/types/OrderType.ts'

const { t } = useI18n()

const props = defineProps<{
  data: OrderBilling
}>()

const billingFullName = computed(() => `${props.data.billingFirstName} ${props.data.billingLastName}`)
const billingAddress = computed(() => `${props.data.billingAddress} ${props.data.billingAddress2 ?? ''}`)
const billingCityAndPostCode = computed(() => `${props.data.billingCity} ${props.data.billingPostCode}`)
const billingStateAndCountry = computed(() => `${props.data.billingState} ${props.data.billingCountry}`)
</script>

<template>
  <div>
    <p class="font-recoleta-medium text-[20px] mb-5">
      {{ t('orders.order.billingInfo.header') }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('orders.order.billingInfo.item_0') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ billingFullName }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('orders.order.billingInfo.item_4') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2">
      {{ billingAddress }}
    </p>
    <p class="font-solina-extended-book text-[16px]">
      {{ billingCityAndPostCode }}
    </p>
    <p class="font-solina-extended-book text-[16px] mb-5">
      {{ billingStateAndCountry }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('orders.order.billingInfo.item_1') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ props.data.billingPhone }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('orders.order.billingInfo.item_2') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2">
      {{ props.data.billingEmail }}
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>
