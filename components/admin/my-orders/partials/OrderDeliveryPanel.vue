<template>
  <Panel :header="props.header ? props.header : $t(textData + 'header')">
    <div
      v-for="(key, index) in Object.keys(props.data)"
      :key="index"
      class="text-[14px] flex flex-col"
    >
      <div v-if="key !== 'tracking'">
        <p class="mt-5">
          {{ $t(`${textData}item_${index}`) }}
        </p>
        <p class="font-bold mt-1">
          {{ getBillingValue(key) }}
        </p>
      </div>
      <div
        v-for="(tracking, index2) in data.tracking"
        v-else
        :key="index2"
      >
        <p class="mt-5 font-bold underline">
          {{ getBoxSize(tracking.boxType) }}
        </p>
        <span class="">{{ $t(`${textData}trackingID`, { tracking: '111111' }) }}</span>
        <p class="font-bold mt-1">
          {{ tracking.trackingID }}
        </p>
        <div class="mt-3">
          <span class="mt-10">Enlace: </span><a
            :href="tracking.trackingLink"
            class="underline font-bold"
            target="_blank"
          >aquí</a>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { OrderDelivery } from '~/composables/admin/orders/types/OrderType.ts'

const { t } = useI18n()
const textData = 'orders.order.delivery.'
const props = defineProps<{
  data: OrderDelivery
  header?: string
}>()

const deliveryHourData = {
  default: t('string.hour.full'),
  morning: t('string.hour.morning'),
  afternoon: t('string.hour.afternoon'),
  night: t('string.hour.night'),
  morning_b2b: t('string.hour.b2b_morning'),
  afternoon_b2b: t('string.hour.b2b_afternoon'),
}

const getBillingValue = (key: string) => {
  if (key === 'deliveryTime') {
    if (!props.data.deliveryTime) {
      return deliveryHourData.default
    }
    return deliveryHourData[props.data[key as keyof OrderDelivery] as keyof typeof deliveryHourData]
  }
  else {
    return props.data[key as keyof OrderDelivery]
  }
}

const getBoxSize = (sku: string) => {
  return sku.includes('IM')
    ? 'Caja mediana'
    : sku.includes('XL')
      ? 'Caja grande'
      : 'Caja pequeña'
}
</script>
