<script setup lang="ts">
import { FREQUENCY_SUBSCRIPTION_TYPE_STEP, BOX_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const emit = defineEmits(['goToStep'])
const { shoppingCart } = useShoppingCartState()
const ONCE_ORDER_PURCHASE_TYPE = 'order'
const SUBSCRIPTION_PURCHASE_TYPE = 'subscription'

const setPurchaseType = (purchaseType: string) => {
  shoppingCart.value.purchaseType = purchaseType
}

const isSubscriptionPurchaseType = computed(() => shoppingCart.value.purchaseType === SUBSCRIPTION_PURCHASE_TYPE)
const isOrderPurchaseType = computed(() => shoppingCart.value.purchaseType === ONCE_ORDER_PURCHASE_TYPE)
const goToNextStep = () => {
  if (isSubscriptionPurchaseType.value) {
    emit('goToStep', FREQUENCY_SUBSCRIPTION_TYPE_STEP)
  } if (isOrderPurchaseType.value) {
    emit('goToStep', BOX_STEP)
  }
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[35%] 2xl:px-[40%]">
    <div class="flex items-center gap-3">
      <Button
        class="w-[2rem] h-[2rem] text-xl"
        icon="mdi mdi-chevron-left"
        rounded
        outlined
      />
      <p class="font-recoleta-regular text-lg font-normal">
        {{
          $t("order.steps.stepPurchase.title")
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-12">
      <Button
        outlined
        :label="$t('order.steps.stepPurchase.btn-subscription')"
        @click.prevent="setPurchaseType(SUBSCRIPTION_PURCHASE_TYPE)"
      />
      <Button
        outlined
        :label="$t('order.steps.stepPurchase.btn-order')"
        @click.prevent="setPurchaseType(ONCE_ORDER_PURCHASE_TYPE)"
      />
    </div>
    <div
      v-if="isOrderPurchaseType"
      class="font-solina-extended-book text-base font-normal leading-6 p-6"
    >
      <p class="mb-5">
        {{ $t("order.steps.stepPurchase.btn-order.section-1") }}
      </p>
      <p>{{ $t("order.steps.stepPurchase.btn-order.section-2") }}</p>
      <div class="text-center mt-6">
        <Button
          severity="secondary"
          :label="$t('order.steps.stepPurchase.btn-continue')"
          @click.prevent="goToNextStep"
        />
      </div>
    </div>
    <div
      v-if="isSubscriptionPurchaseType"
      class="font-solina-extended-book text-base font-normal leading-6 py-6 px-2"
    >
      <p class="mb-5">
        {{ $t("order.steps.stepPurchase.btn-subscription.section-1") }}
      </p>
      <p>{{ $t("order.steps.stepPurchase.btn-subscription.section-2") }}</p>
      <ul class="list-square ml-7">
        <li
          v-for="n in 3"
          :key="n"
        >
          <MDC :value="$t(`order.steps.stepPurchase.btn-subscription.section-3.bullet-${n}`)" />
        </li>
      </ul>
      <div class="text-center mt-6">
        <Button
          severity="secondary"
          :label="$t('order.steps.stepPurchase.btn-continue')"
          @click.prevent="goToNextStep"
        />
      </div>
    </div>
  </div>
</template>
