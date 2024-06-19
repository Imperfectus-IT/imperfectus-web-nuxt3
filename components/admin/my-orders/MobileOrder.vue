<template>
  <div class="lg:min-w-[900px] lg:max-w-[1500px]">
    <Panel
      :header="`Pedido ${order.id}`"
      :style="{ minHeight: isOneStepOrder }"
      class="relative lg:min-h-[500px]"
    >
      <Divider class="mt-2" />
      <p
        v-if="order.status === 'pending'"
        class="bg-orange-primary px-2 py-2 rounded-lg mb-3"
      >
        Este pedido está pendiente de pago
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

      <OrderCoupon v-if="!isCollapsed" />
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
import type { ReviewRatings } from '~/components/admin/my-orders/partials/types/ReviewRatings.ts'
import type { OrderItem } from '~/composables/admin/orders/types/OrderType.ts'

const { t } = useI18n()
const toast = useToast()
const emits = defineEmits(['review-created'])
const { successToast, errorToast } = useToastService()

const props = defineProps<{
  order: Order
  isCollapsed: boolean
  products: ItemProduct[]
}>()
const textSection = 'orders.order.review.'

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
</script>
