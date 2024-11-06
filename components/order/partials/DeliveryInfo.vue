<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dayjs/locale/ca'

const { locale } = useI18n()
const { t } = useI18n()

const props = defineProps({
  deliveryDate: {
    type: String,
    required: true,
  },
  deliveryHour: {
    type: String,
    required: true,
  },
  shipping: {
    type: Object as PropType<OrderShipping>,
    required: true,
  },
})

const deliveryDate = computed(() => {
  let dayName = dayjs(props.deliveryDate).locale(locale.value).format('dddd')
  dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1)
  return `${dayName} ${dayjs(props.deliveryDate).format('DD-MM-YYYY')}`
})

const fullName = computed(() => {
  return `${props.shipping.shippingFirstName} ${props.shipping.shippingLastName}`
})

const shippingAddress = computed(() => {
  return `${props.shipping.shippingAddress} ${props.shipping.shippingAddress2 ?? ''}`
})

const shippingCityAndPostCode = computed(() => {
  return `${props.shipping.shippingCity} ${props.shipping.shippingPostCode}`
})

const shippingStateAndCountry = computed(() => {
  return `${props.shipping.shippingState} ${props.shipping.shippingCountry}`
})
</script>

<template>
  <div>
    <p class="font-recoleta-medium text-[20px] mb-5">
      {{ t('pages.order.status.shippingData') }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.estimateDay') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ deliveryDate }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.estimateTime') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ deliveryHour }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.name') }}
    </p><p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ fullName }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.address') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2">
      {{ shippingAddress }}
    </p>
    <p class="font-solina-extended-book text-[16px]">
      {{ shippingCityAndPostCode }}
    </p>
    <p class="font-solina-extended-book text-[16px] mb-5">
      {{ shippingStateAndCountry }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.phone') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ props.shipping.shippingPhone }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.email') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2">
      {{ props.shipping.shippingEmail }}
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>
