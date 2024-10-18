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
          <span v-if="key === 'deliveryDate'">
            {{ useFormatDateForDisplay(props.data.deliveryDate) }}
          </span>
          <span v-else>
            {{ getBillingValue(key) }}
          </span>
        </p>
      </div>
      <div
        v-else
        class="text-[14px] flex flex-col mt-6"
      >
        <span class="">{{ $t(`${textData}trackingID`) }}</span>
        <p class="font-bold mt-1">
          {{ data.tracking.trackingId }}
        </p>
        <div class="mt-3">
          <span class="mt-10">Enlace de seguimiento: </span><a
            :href="data.tracking.trackingUrl"
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
import dayjs from 'dayjs'

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

const useFormatDateForDisplay = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY')
}
</script>
