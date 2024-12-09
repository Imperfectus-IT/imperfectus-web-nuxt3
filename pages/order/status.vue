<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MD5 from 'crypto-js/md5'

// definePageMeta({
//   layout: 'default',
//   middleware: ['auth'],
// })

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const redsysForm = ref<HTMLFormElement | null>(null)
const { removeShoppingCart } = useLocalStorageShoppingCartRepository()
const notification = ref(route.query.notification || '')
const isOrderFailed = computed(() => route.path.includes('failed'))
const { order } = useOrdersState()
useGetOrderByNotificationHandler(notification.value as string)

const totalAmountWithoutDiscount = computed(() => {
  if (!order.value?.orderPayment.totalAmount) {
    return null
  }
  const amountWithoutDiscount = order.value?.orderPayment.totalAmount + order.value?.orderPayment.totalDiscount + order.value?.orderPayment.totalTax
  return parseFloat(amountWithoutDiscount.toFixed(2))
})

const couponCode = computed(() => {
  if (!order.value?.orderItems) {
    return ''
  }
  const orderItemWithCoupon = order.value.orderItems.find(item => item.coupon)
  if (!orderItemWithCoupon) {
    return ''
  }
  return orderItemWithCoupon.coupon.coupon
})

const retryPayment = () => {
  redsysForm.value.submit()
}

onMounted(() => {
  if (!isOrderFailed.value) {
    removeShoppingCart()
  }
})

useHead({
  title: isOrderFailed.value ? t(t('pages.order.status.paymentError')) : t('pages.order.status.thanks'),
  meta: [
    {
      name: 'description',
      content: t(''), // TODO: Add description
    },
  ],
  script: [
    {
      innerHTML: `
        var ADT = ADT || {};
        ADT.Tag = ADT.Tag || {};
        ADT.Tag.t = 3;
        ADT.Tag.c = "EUR";
        ADT.Tag.tp = 1829209966;
        ADT.Tag.am = ${totalAmountWithoutDiscount.value};
        ADT.Tag.ti = "${order.value?.id}";
        ADT.Tag.xd = "${MD5(order.value?.shippingInfo?.shippingEmail).toString()}";
        ADT.Tag.cpn = "${couponCode.value}";
      `,
      type: 'text/javascript',
      key: 'ADT-script',
    },
    {
      defer: true,
      src: 'https://ion.talkualfoods.com/jsTag?ap=1829209928',
      key: 'ADT-src-script',
    },
  ],
})
</script>

<template>
  <Container
    v-if="order"
    class="px-6"
  >
    <h1
      v-if="!isOrderFailed"
      class="mt-10 mb-5 text-center font-recoleta-regular text-[40px] text-grey-primary md:mb-10"
    >
      {{ $t("pages.order.status.thanks") }}
    </h1>
    <h1
      v-if="isOrderFailed"
      class="mt-10 mb-5 text-center font-recoleta-regular text-[40px] text-grey-primary md:mb-10"
    >
      {{ $t("pages.order.pay.title") }}
    </h1>
    <CompletePaymentOrderDetails
      v-if="order.orderPayment"
      :order-id="order.order_id"
      :delivery-date="order.deliveryDate"
      :total="order.orderPayment.totalAmount"
    />

    <ClientOnly>
      <TKTimeline
        :order-status="order.status"
        class="mt-12"
        layout-type="horizontal"
      />
    </ClientOnly>

    <Divider class="before:border-grey-secondary mt-12" />

    <Panel class="mt-7">
      <div class="flex flex-col gap-5">
        <OrderItemCard
          v-for="(item, index) in order?.orderItems"
          :key="index"
          class="!mt-0"
          :order-item="item"
        />
      </div>
    </Panel>

    <div
      v-if="isOrderFailed"
      class="mt-5 flex justify-center"
    >
      <RedsysPaymentForm
        ref="redsysForm"
        :is-button-outlined="false"
        :order="order"
      />
      <Button
        :label="$t('pages.order.pay.pay')"
        @click.prevent="retryPayment"
      />
    </div>

    <Divider class="before:border-grey-secondary mt-14" />

    <div class="mt-5 flex flex-col justify-around md:flex-row md:items-start gap-10 md:gap-0">
      <DeliveryInfo
        v-if="order.shippingInfo"
        :delivery-date="order.deliveryDate"
        :delivery-hour="order.deliveryHour"
        :shipping="order.shippingInfo"
      />

      <BillingInfo
        v-if="order.billingInfo"
        :data="order.billingInfo"
      />
      <PaymentInfo
        v-if="order.orderPayment && !isOrderFailed"
        :order-payment="order.orderPayment"
      />
    </div>

    <Divider class="before:border-grey-secondary mt-10 mb-9 " />

    <NuxtLink
      :to="localePath({ name: 'admin' })"
      class="flex justify-center"
    >
      <Button
        :label="$t('pages.order.pay.goToMyAccount')"
      />
    </NuxtLink>
  </Container>
</template>
