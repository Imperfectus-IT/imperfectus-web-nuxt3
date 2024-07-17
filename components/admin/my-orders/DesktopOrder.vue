<template>
  <div class="min-w-[1000px] lg:flex-grow">
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
        {{ $t(`${textData}pending`) }}
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
              :order-item-id="orderItem.id"
              @create-review="handleCreateReview"
            />
            <OrderProductsCarousel
              v-if="!isCollapsed"
              :products="filteredProducts(orderItem)"
            />
            <OrderEdit
              v-if="!isCollapsed"
              :exclusions="orderItem.exclusions"
              :order-item="orderItem"
              :order-id="order.id"
              @update-item="handleUpdateOrderItem"
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
            class="flex flex-row gap-4 mt-4 lg:mt-10"
          >
            <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
              <Button
                outlined
                :label="$t(`${textData}details`)"
                :pt="{ label: 'text-[14px]' }"
              />
            </NuxtLink>
            <NuxtLink :to="`/order/pay?order=${order.order_id}`">
              <Button
                outlined
                :label="$t(`${textData}payment`)"
                :pt="{ label: 'text-[14px]', root: 'text-green-tertiary border-[1px] bg-green-primary px-4 py-2 rounded-lg' }"
              />
            </NuxtLink>
            <Button
              outlined
              :label="$t(`${textData}discard.title`)"
              :pt="{ label: 'text-[14px]', root: 'text-green-tertiary border-[1px] bg-red-secondary px-4 py-2 rounded-lg' }"
              @click="handleDiscardOrder"
            />
          </div>
        </div>

        <div
          v-else
          class="flex flex-row justify-between w-full items-center mt-7"
        >
          <div class="bg-red-secondary w-1/4 h-9 rounded-lg flex items-center justify-center text-[12px]">
            {{ $t("string.status.order.cancelled") }}
          </div>
          <!--          @TODO INSERT CANCELLED AT COLUMN TO ORDERS -->
          <p>{{ $t(`${textData}cancelledDate`, { date: '1-1-2024' }) }}</p>
          <!-- TODO This is not stored in DB -->
        </div>
      </div>
      <OrderCoupon
        v-if="!isCollapsed && (order.status === 'pending' || order.status === 'failed')"
        :order-coupon="order.coupon"
        @add-coupon="handleAddOrderCoupon"
        @remove-coupon="handleRemoveOrderCoupon"
      />
      <div
        v-if="order.status === 'completed' && !isCollapsed"
        class="mt-5 w-2/3"
      >
        <h4 class="font-bold">
          Valoración del pedido
        </h4>
        <Divider class="mt-2 !w-2/3" />
        <Textarea
          v-model="review"
          :disabled="!canWriteReview"
          class="w-2/3"
          rows="6"
          :pt="{
            root: 'border-[1px] border-green-tertiary bg-transparent px-4 py-3 rounded-lg w-full mb-4 outline-none',
          }"
        />
        <Button
          v-if="canWriteReview"
          label="Guardar"
          @click="saveOrderReview"
        />
      </div>
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
      />

      <OrderShippingPanel
        class="mt-5"
        :data="order.shippingInfo"
        :order-id="order.id"
        :label-key="'orders.order.order_shipping'"
        @edit-shipping-info="handleUpdateOrderShipping"
      />

      <OrderBillingInfoPanel
        class="mt-5"
        :data="order.billingInfo"
        :label-key="'orders.order.order_billing_info'"
        @edit-billing-info="handleUpdateOrderBilling"
      />
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Order, OrderBilling, OrderItem, OrderShipping } from '~/composables/admin/orders/types/OrderType.ts'
import type { ReviewRatings } from '~/components/admin/my-orders/partials/types/ReviewRatings.ts'
import type { BoxProduct, ItemProduct } from '~/composables/admin/products/types/Product.ts'
import type { updateOrderItemPayload } from '~/components/admin/my-orders/partials/OrderEdit.vue'

const { t } = useI18n()
const emits = defineEmits(['review-created'])
const textData = 'orders.order.'
const props = defineProps<{
  order: Order
  isCollapsed: boolean
  products: ItemProduct[]
}>()

const review = ref<string>(props.order.orderReview || '')
const canWriteReview = computed (() => props.order.orderReview?.length < 1)
const { createReview } = useCreateOrderItemReviewHandler(t)
const { addOrderReview, addOrderCoupon, discardOrder, removeOrderCoupon, updateOrderItem, updateOrderBilling, updateOrderShipping } = useUpdateOrderHandler(t)
const handleCreateReview = async (newReviewData: createOrderItemReviewPayload) => {
  await createReview(newReviewData, textData)
}
const handleDiscardOrder = async () => {
  await discardOrder(props.order.id, textData)
}
const handleUpdateOrderShipping = async (meta: updateOrderShippingPayload) => {
  await updateOrderShipping(meta, props.order.orderMeta, textData)
}
const handleUpdateOrderBilling = async (meta: OrderBilling) => {
  await updateOrderBilling(meta, props.order.orderMeta, textData)
}
const handleRemoveOrderCoupon = async () => {
  await removeOrderCoupon(props.order, props.order.coupon, textData)
}
const handleAddOrderCoupon = async (coupon: string) => {
  await addOrderCoupon(props.order, coupon, textData)
}
const handleUpdateOrderItem = async (updateOrderItemData: updateOrderItemPayload) => {
  await updateOrderItem(updateOrderItemData, textData)
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
const saveOrderReview = async () => {
  await handleAddOrderReview(props.order, review.value, textData)
}

export type updateOrderShippingPayload = OrderShipping & { order: number }
export type createOrderItemReviewPayload = {
  newRatings: ReviewRatings
  orderItemId: number
}
</script>
