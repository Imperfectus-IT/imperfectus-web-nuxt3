<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { useGetOrderHandler } from '~/composables/admin/orders/application/getOne/useGetOrderHandler.ts'

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

const { t } = useI18n()

useHead({
  title: t('pages.order.pay.title'),
  meta: [
    {
      name: 'description',
      content: t('pages.order.pay.description'),
    },
  ],
})

const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const { validateDeliveryDate, isValidDeliveryDate } = useValidateDeliveryDateHandler()
const order_id: number = Number(route.query.order)
const currentStep = ref(FINISH_PAYMENT_PAY)
const isModalErrorCouponVisible = ref(false)

const { order } = useGetOrderHandler(order_id, t)
const { addOrderCoupon } = useUpdateOrderHandler(t)

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

    const coupon = newOrder.orderItems[0].coupon?.coupon
    console.info('Order item:', coupon)
    if (coupon) {
      await addOrderCoupon(newOrder, coupon)
      isModalErrorCouponVisible.value = !!order.value.orderItems[0].coupon
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

const closeModalErrorCoupon = () => {
  isModalErrorCouponVisible.value = false
}
</script>

<template>
  <Dialog
    :visible="isModalErrorCouponVisible"
    modal
    :closable="false"
    :dismissable-mask="true"
    :header="t('pages.order.pay.invalidCoupon.title')"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :pt="{
      root: 'w-full bg-beige-primary rounded-lg text-green-tertiary lg:w-[500px] lg:px-14 lg:pt-2 lg:pb-8',
      header: 'font-recoleta-regular text-green-tertiary text-center py-8',
      title: 'text-[30px]',
      content: '',
    }"
  >
    <div class="mt-8 mb-5 flex justify-center">
      <Button
        :label="t('pages.order.pay.invalidCoupon.close')"
        @click="closeModalErrorCoupon"
      />
    </div>
  </Dialog>

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

    <div class="mt-8 mb-5 flex justify-center">
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
