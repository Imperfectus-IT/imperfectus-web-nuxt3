<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  orderId: {
    type: Number,
    required: true,
  },
  deliveryDate: String,
  total: {
    type: Number,
    required: true,
  },
})

const formattedTotal = computed(() => {
  return `${props.total.toFixed(2)} €`
})
</script>

<template>
  <div class="flex flex-col gap-3 md:flex-row md:justify-around">
    <CompletePaymentOrderInfoItem
      class=""
      :label="t('pages.order.pay.orderNumber')"
      :value="props.orderId.toString()"
    />
    <CompletePaymentOrderInfoItem
      class=""
      :label="t('pages.order.pay.deliveryEstimate')"
      :value="props.deliveryDate"
    />
    <CompletePaymentOrderInfoItem
      class=""
      :label="t('pages.order.pay.total')"
      :value="formattedTotal"
    />
  </div>
</template>
