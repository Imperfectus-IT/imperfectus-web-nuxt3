<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { useGetOrderHandler } from '~/composables/admin/orders/application/getOne/useGetOrderHandler.ts'
import { FINISH_PAYMENT_DELIVERY_DATE } from '~/composables/orders/types/FinishPaymentConstants.ts'

const { t } = useI18n()
// TODO: Use the useLocalePath composable
const localePath = useLocalePath()
const router = useRouter()

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

const { order } = useGetOrderHandler(order_id, t)

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

/**
 * The purchase is disabled if the order was created more than 3 months ago
 * @returns boolean
 */
const isPurchaseDisabled = computed(() => {
  if (order.value) {
    return dayjs(order.value.createdAt).isBefore(dayjs().subtract(3, 'month'))
  }
  return false
})
</script>

<template>
  <Dialog
    :visible="isPurchaseDisabled"
    modal
    :closable="false"
    :dismissable-mask="true"
    :header="t('purchaseDisabled.title')"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :pt="{
      root: 'bg-beige-primary rounded-lg text-green-tertiary lg:w-[500px] lg:px-14 lg:pt-2 lg:pb-8',
      header: 'font-recoleta-regular text-green-tertiary text-center py-8',
      title: 'text-[30px]',
      content: '',
    }"
  >
    <p class="text-center">
      {{ t('purchaseDisabled.message') }}
    </p>

    <div class="flex justify-center mt-8 mb-5">
      <Button
        :label="t('purchaseDisabled.newOrder')"
        @click="router.push(localePath({ name: 'order' }))"
      />
    </div>
  </Dialog>
  <component
    :is="componentToRenderFromStep[currentStep]"
    :order="order"
  />
</template>

<style scoped lang="scss"></style>
