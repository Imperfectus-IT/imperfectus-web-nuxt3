<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import type { OrderPayment } from '~/server/contexts/backend/payments/domain/OrderPayment.ts'

const { t } = useI18n()

const props = defineProps({
  orderPayment: {
    type: Object as PropType<OrderPayment>,
    required: true,
  },
})

const formattedTotalAmount = props.orderPayment.totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
</script>

<template>
  <div>
    <p class="font-recoleta-medium text-[20px] mb-5">
      {{ t('pages.order.status.paymentData') }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.status') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ t('pages.order.status.payed') }} {{ dayjs(props.orderPayment.paidAt).format('DD-MM-YYYY - HH:mm') }}h
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.total') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ formattedTotalAmount }} €
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>
