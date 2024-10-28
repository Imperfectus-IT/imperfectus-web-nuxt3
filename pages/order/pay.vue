<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGetOrderHandler } from '~/composables/admin/orders/application/getOne/useGetOrderHandler.ts'
import { FINISH_PAYMENT_DELIVERY_DATE } from '~/composables/orders/types/FinishPaymentConstants.ts'

const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: t('pages.order.pay.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.order.pay.description'),
    },
  ],
})

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

// defineI18nRoute({
//   paths: {
//     es: '/order/pay?order=[order]',
//     ca: '/el-meu-compte/subscripcions/properes-entregues/[id]',
//   },
// })

const route = useRoute()
const { validateDeliveryDate, isValidDeliveryDate } = useValidateDeliveryDateHandler()
const order_id: number = Number(route.query.order)
const currentStep = ref(FINISH_PAYMENT_PAY)

const { order } = useGetOrderHandler<Order>(order_id, t)

const componentToRenderFromStep: Record<string, Component> = {
  [FINISH_PAYMENT_PAY]: resolveComponent('FinishPaymentStep'),
  [FINISH_PAYMENT_DELIVERY_DATE]: resolveComponent('DeliveryDatePaymentStep'),
}

watch(order, async (newOrder) => {
  if (newOrder) {
    await validateDeliveryDate(newOrder.id, newOrder.deliveryDate)
    if (!isValidDeliveryDate.value) {
      currentStep.value = FINISH_PAYMENT_DELIVERY_DATE
    }
  }
})
</script>

<template>
  <component
    :is="componentToRenderFromStep[currentStep]"
    :order="order"
  />
</template>

<style scoped lang="scss"></style>
