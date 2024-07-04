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
  <div class="px-10 md:px-[28%] lg:px-[20%] 2xl:px-[20%] relatve">
    <div class="flex items-center justify-center gap-3">
      <div class="!absolute left-5 flex flex-row gap-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
        />
        <span class="my-auto hidden lg:block">Volver</span>
      </div>
      <p class="font-recoleta-regular text-lg font-normal lg:text-2xl ">
        {{
          $t("order.steps.stepPurchase.title")
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-6 lg:flex-row lg:mt-4 lg:justify-center">
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
      class="font-solina-extended-book text-base font-normal leading-6 p-6 lg:grid lg:grid-cols-2"
    >
      <div>
        <p class="mb-5">
          {{ $t("order.steps.stepPurchase.btn-order.section-1") }}
        </p>
        <p>{{ $t("order.steps.stepPurchase.btn-order.section-2") }}</p>
      </div>

      <NuxtImg
        src="/images/steps/purchaseType/Ipad2_Dark2.webp"
        format="webp"
        loading="lazy"
        class="hidden lg:block w-[400px] col-start-1 row-start-1"
      />
    </div>

    <div
      v-if="isSubscriptionPurchaseType"
      class="font-solina-extended-book text-base font-normal leading-6 p-6 lg:grid lg:grid-cols-2"
    >
      <div class="lg:col-start-2">
        <p class="mb-5">
          {{ $t("order.steps.stepPurchase.btn-subscription.section-1") }}
        </p>
        <p class="lg:-mt-5">
          {{ $t("order.steps.stepPurchase.btn-subscription.section-2") }}
        </p>

        <ul class="list-square ml-7">
          <li
            v-for="n in 3"
            :key="n"
          >
            <MDC :value="$t(`order.steps.stepPurchase.btn-subscription.section-3.bullet-${n}`)" />
          </li>
        </ul>
      </div>
      <NuxtImg
        src="/images/steps/purchaseType/Ipad2_Dark2.webp"
        format="webp"
        loading="lazy"
        class="hidden lg:block w-[400px] col-start-1 row-start-1"
      />
    </div>
    <div class="text-center mt-8">
      <Button
        severity="secondary"
        :label="$t('order.steps.stepPurchase.btn-continue')"
        @click.prevent="goToNextStep"
      />
    </div>
  </div>
</template>
