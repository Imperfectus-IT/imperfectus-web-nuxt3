<template>
  <div class="min-w-[1000px]">
    <Panel
      :header="`Pedido ${order.id}`"
      :style="{ minHeight: isOneStepOrder }"
      :class="`p-2 relative `"
    >
      <Divider class="mt-2 !w-1/2" />
      <p
        v-if="order.status === 'pending'"
        class="bg-orange-primary w-1/2 px-2 py-2 rounded-lg "
      >
        Este pedido está pendiente de pago
      </p>
      <div class="flex flex-row justify-between flex-wrap -mt-6 ">
        <div
          v-for="(orderItem, index) in order.orderItems"
          :key="index"
          class="mt-7 w-2/3"
        >
          <div class="flex flex-col">
            <OrderItemCard
              :order-item="orderItem"
              :order-status="order.status"
            />
            <OrderItemReview
              v-if="!isCollapsed && order.status === 'completed'"
              :review="orderItem.review ? orderItem.review.ratings : null"
              @create-review="(newReview: ReviewRatings) => handleCreateRating(newReview, orderItem.id)"
            />
            <OrderProductsCarousel
              v-if="!isCollapsed"
              :products="filteredProducts(orderItem)"
            />
            <OrderEdit
              v-if="!isCollapsed"
              :exclusions="orderItem.exclusions"
              :order-item="orderItem"
            />
          </div>
        </div>
        <div
          v-if="order.status !== 'cancelled'"
          :style="{ minHeight: isOneStepOrder }"
          :class="`absolute right-0 top-14 w-1/3 `"
        >
          <TKTimeline
            class="absolute -mt-10 left-0"
            :order-status="order.status"
          />
        </div>
        <div
          v-if="order.status !== 'cancelled'"
          class="bottom-3 w-full"
        >
          <div v-if="isCollapsed && order.status !== 'pending'">
            <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
              <Button
                outlined
                label="Detalles del pedido"
                :pt="{ label: 'text-[14px]' }"
                class="mt-8 w-1/3"
              />
            </NuxtLink>
          </div>
          <div
            v-else-if="isCollapsed"
            class="flex flex-row gap-4 mt-4"
          >
            <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
              <Button
                outlined
                label="Detalles del pedido"
                :pt="{ label: 'text-[14px]' }"
              />
            </NuxtLink>
            <NuxtLink :to="`/order/pay?order=${order.order_id}`">
              <Button
                outlined
                label="Finalizar pago"
                :pt="{ label: 'text-[14px]', root: 'text-green-tertiary border-[1px] bg-green-primary px-4 py-2 rounded-lg' }"
              />
            </NuxtLink>
            <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
              <Button
                outlined
                label="Descartar pedido"
                :pt="{ label: 'text-[14px]', root: 'text-green-tertiary border-[1px] bg-red-secondary px-4 py-2 rounded-lg' }"
              />
            </NuxtLink>
          </div>
        </div>

        <div
          v-else
          class="flex flex-row justify-between w-full items-center mt-7"
        >
          <div class="bg-red-secondary w-1/4 h-9 rounded-lg flex items-center justify-center text-[12px]">
            {{ $t("string.status.order.cancelled") }}
          </div>
          <p>Fecha de cancelacion: **********</p>
          <!-- TODO This is not stored in DB -->
        </div>
      </div>

      <OrderCoupon v-if="!isCollapsed && order.status !== 'completed'" />
    </Panel>

    <div
      v-if="!isCollapsed"
      class="text-green-tertiary grid grid-cols-2 gap-x-5 gap-y-0"
    >
      <OrderBillingPanel
        class="mt-5"
        :data="order.billing"
        :label-key="'orders.order.billing'"
      />
      <OrderDeliveryPanel
        class="mt-5"
        :data="order.deliveryInfo"
        :label-key="'orders.order.order_delivery'"
      />

      <OrderShippingPanel
        class="mt-5"
        :data="order.shippingInfo"
        :label-key="'orders.order.order_shipping'"
        @edit-shipping-info="() => console.log('Edit shipping info')"
      />

      <OrderBillingInfoPanel
        class="mt-5"
        :data="order.billingInfo"
        :label-key="'orders.order.order_billing_info'"
        @edit-billing-info="() => console.log('Edit billing info')"
      />
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { OrderItem } from '~/composables/admin/orders/types/OrderType.ts'
import type { ReviewRatings } from '~/components/admin/my-orders/partials/types/ReviewRatings.ts'

const { t } = useI18n()
const toast = useToast()
const emits = defineEmits(['review-created'])
const { successToast, errorToast } = useToastService()
const textSection = 'orders.order.review.'
const props = defineProps<{
  order: Order
  isCollapsed: boolean
  products: ItemProduct[]
}>()
const { handleCreateReview } = useCreateOrderItemReviewHandler()
const handleCreateRating = async (newReview: ReviewRatings, orderItemId: number) => {
  try {
    await handleCreateReview(newReview, orderItemId)
    emits('review-created')
    successToast(toast, t(`${textSection}successToast.title`), t(`${textSection}successToast.description`))
  }
  catch (error) {
    errorToast(toast, t(`${textSection}errorToast.title`), t(`${textSection}errorToast.description`))
  }
}

const filteredProducts = (orderItem: OrderItem) => {
  return props.products.filter((product) => {
    return !orderItem.exclusions.includes(product.name) && product.isActive
  })
}

const isOneStepOrder = computed(() => {
  const oneStepStatuses = ['refunded', 'cancelled', 'failed', 'replaced']
  return oneStepStatuses.includes(props.order.status) ? '150px' : '420px'
})
</script>
