<script setup lang="ts">
import { ref } from 'vue'
import { useFormPaymentHandler } from '~/composables/payment/application/form/useFormPaymentHandler.ts'
import { useSleep } from '~/composables/shared/useSleep.ts'

const props = defineProps<{
  order: Order
}>()

const localePath = useLocalePath()
const { sleep } = useSleep()
const { url, body, formPaymentHandler } = useFormPaymentHandler()
const formRef = ref<HTMLFormElement | null>(null)

const paymentNotAvailable = ref(false)

const goToPayment = async () => {
  try {
    await formPaymentHandler(props.order.id)

    if (!url.value || !formRef.value) {
      paymentNotAvailable.value = true
      return
    }

    await sleep(200)
    console.info('submitting form')
    formRef.value.submit()
  }
  catch (error) {
    console.info('orderpaymentform error')
    console.info(error.message)
  }
}
</script>

<template>
  <Container
    v-if="order"
    class="px-6"
  >
    <h1 class="mt-10 mb-5 text-center font-recoleta-regular text-[40px] text-grey-primary md:mb-10">
      {{ $t("pages.order.pay.title") }}
    </h1>

    <CompletePaymentOrderDetails
      :order-id="order.order_id"
      :delivery-date="order.deliveryDate"
      :total="order.orderPayment.totalAmount"
    />

    <TKTimeline
      :order-status="order.status"
      class="mt-12"
      layout-type="horizontal"
    />

    <Panel class="mt-12">
      <div class="flex flex-col gap-5">
        <OrderItemCard
          v-for="(item, index) in order?.orderItems"
          :key="index"
          class="!mt-0"
          :order-item="item"
        />
      </div>
    </Panel>

    <CompletePaymentActions
      v-model:form-ref="formRef"
      class="mt-16 mb-16"
      :order="order"
      :url="url"
      :body="body"
      @on-submit="goToPayment"
    />

    <Divider class="before:border-grey-secondary" />

    <div class="mt-10 flex flex-col items-center justify-around md:flex-row md:items-start gap-10 md:gap-0">
      <DeliveryInfo
        :delivery-date="order.deliveryDate"
        :shipping="order.shippingInfo"
      />

      <BillingInfo :data="order.billingInfo" />
    </div>

    <Divider class="mt-10 mb-16 before:border-grey-secondary" />

    <NuxtLink
      :to="localePath({ name: 'admin' })"
      class="flex justify-center"
    >
      <Button
        :label="$t('pages.order.pay.goToMyAccount')"
      />
    </NuxtLink>
  </container>
</template>

<style scoped lang="scss">

</style>
