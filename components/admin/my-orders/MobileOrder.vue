<template>
  <div>
    <Panel
      :header="`Pedido ${order.id}`"
      class="relative lg:min-h-[500px]"
    >
      <Divider class="mt-2" />
      <p
        v-if="order.status === 'pending'"
        class="bg-orange-primary px-2 py-2 rounded-lg mb-3"
      >
        {{ $t(`${textData}pending`) }}
      </p>

      <div
        v-for="(orderItem, index) in order.orderItems"
        :key="index"
      >
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

      <div
        v-if="order.status !== 'cancelled'"
        class="lg:absolute lg:bottom-3 lg:w-full"
      >
        <div v-if="isCollapsed && order.status !== 'pending'">
          <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
            <Button
              outlined
              label="Detalles del pedido"
              :pt="{
                label: 'text-[14px]',
              }"
              class="mt-8 w-2/3"
            />
          </NuxtLink>
        </div>
        <div
          v-else-if="isCollapsed"
          class="flex flex-col gap-3 my-7"
        >
          <div class="flex flex-row gap-3">
            <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
              <Button
                outlined
                label="Detalles del pedido"
                :pt="{
                  label: 'text-[12px]',
                  root: 'text-green-tertiary border-[1px] bg-beige-primary px-4 py-2 rounded-lg',
                }"
              />
            </NuxtLink>
            <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
              <Button
                outlined
                label="Finalizar pago"
                :pt="{
                  label: 'text-[12px]',
                  root: 'text-green-tertiary border-[1px] bg-green-primary px-4 py-2 rounded-lg',
                }"
              />
            </NuxtLink>
          </div>
          <NuxtLink :to="`/mi-cuenta/pedidos/${order.id}`">
            <Button
              outlined
              label="Descartar pedido"
              :pt="{
                label: 'text-[12px]',
                root: 'text-green-tertiary border-[1px] bg-red-secondary px-4 py-2 rounded-lg',
              }"
              @click="handleDiscardOrder"
            />
          </NuxtLink>
        </div>
      </div>

      <div v-else>
        <div
          class="bg-red-secondary w-1/2 h-9 rounded-lg flex items-center justify-center text-[12px] mt-6"
        >
          {{ $t("string.status.order.cancelled") }}
        </div>
        <p class="mt-3">
          Fecha de cancelacion: **********
        </p>
        <!-- TODO This is not stored in DB -->
      </div>

      <TKTimeline
        v-if="order.status !== 'cancelled'"
        class="mt-3 left-0"
        :order-status="order.status"
      />

      <OrderCoupon
        v-if="!isCollapsed && (order.status === 'pending' || order.status === 'failed')"
        :order-coupon="order.coupon"
        @add-coupon="handleAddOrderCoupon"
        @remove-coupon="handleRemoveOrderCoupon"
      />
      <div
        v-if="order.status === 'completed' && !isCollapsed"
        class="mt-5"
      >
        <h4 class="font-bold text-[14px] mb-2">
          Valoración del pedido
        </h4>
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
          :pt="{
            root: 'bg-green-primary border-[1px] border-green-tertiary text-green-tertiary px-4 py-2 rounded-lg w-full',
          }"
          label="Guardar"
          @click="saveOrderReview"
        />
      </div>
    </Panel>

    <div
      v-if="!isCollapsed"
      class="flex flex-col gap-5 text-green-tertiary lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-0"
    >
      <OrderDeliveryPanel
        class="mt-5"
        :data="order.deliveryInfo"
        :label-key="'orders.order.order_delivery'"
      />
      <OrderBillingPanel
        class="mt-5"
        :data="order.billing"
        :label-key="'orders.order.billing'"
      />

      <OrderShippingPanel
        class="mt-5"
        :data="order.shippingInfo"
        :label-key="'orders.order.order_shipping'"
        :order-id="order.id"
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
import type { Order, OrderBilling, OrderItem, OrderShipping } from '~/composables/admin/orders/domain/OrderType.ts'
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
  await createReview(newReviewData, textData, t)
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

const saveOrderReview = async () => {
  await handleAddOrderReview(props.order, review.value, textData)
}

export type updateOrderShippingPayload = OrderShipping & { order: number }
export type createOrderItemReviewPayload = {
  newRatings: ReviewRatings
  orderItemId: number
}
</script>
