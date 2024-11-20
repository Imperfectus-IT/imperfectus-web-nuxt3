<script setup lang="ts">
const emit = defineEmits([GO_TO_STEP_EVENT])
const { shoppingCart } = useShoppingCartState()
const { setShoppingCart } = useLocalStorageShoppingCartRepository()
const { activeBoxProducts } = useProductsState()
const { generateSku } = useGenerateSku()

const { emptyItem } = useShoppingCartFactory()

const setPurchaseType = (purchaseType: string) => {
  if (!shoppingCart.value.currentItem) {
    shoppingCart.value.currentItem = emptyItem()
  }
  shoppingCart.value.currentItem.purchaseType = purchaseType
  purchaseType === 'order' ? shoppingCart.value.currentItem.frequency = 'once' : shoppingCart.value.currentItem.frequency = ''
}

const isSubscriptionPurchaseType = computed(() => shoppingCart.value.currentItem?.purchaseType === SUBSCRIPTION_TYPE)
const isOrderPurchaseType = computed(() => shoppingCart.value.currentItem?.purchaseType === ORDER_TYPE)

const goToNextStep = () => {
  const purchaseTypesForStep = {
    [SUBSCRIPTION_TYPE]: FREQUENCY_SUBSCRIPTION_TYPE_STEP,
    [ORDER_TYPE]: RESUME_ITEM_STEP,
  }

  const nextStep = purchaseTypesForStep[shoppingCart.value.currentItem?.purchaseType]
  const user = useStrapiUser()
  if (shoppingCart.value.currentItem.purchaseType === ORDER_TYPE) {
    const newSku = generateSku(shoppingCart.value.currentItem.boxType, shoppingCart.value.currentItem.boxSize, shoppingCart.value.frequency as string)
    shoppingCart.value.currentItem.product = activeBoxProducts.value
      .find((boxProduct: BoxProduct) => {
        return boxProduct.boxType === shoppingCart.value.currentItem.boxType && boxProduct.sku === newSku
      })
    shoppingCart.value.currentItem.amount = shoppingCart.value.currentItem.product?.price ?? 0
    const currentItem: ShoppingCartItem = shoppingCart.value.currentItem as ShoppingCartItem
    const itemExists = shoppingCart.value.items.some(item => item.uuid === currentItem.uuid)
    if (!itemExists) {
      shoppingCart.value.items.push(currentItem)
    }
    setShoppingCart(shoppingCart.value)
    emit(GO_TO_STEP_EVENT, user?.value?.id ? nextStep : AUTH_STEP)
  }
  else {
    setShoppingCart(shoppingCart.value)
    emit(GO_TO_STEP_EVENT, nextStep)
  }
}
</script>

<template>
  <div class="px-8 md:px-[28%] lg:px-[20%] 2xl:px-[20%] relative">
    <div class="flex items-center lg:justify-center gap-5">
      <div class="lg:absolute lg:left-[35px] flex flex-row gap-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="$emit(GO_TO_STEP_EVENT, BOX_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
      <p class="font-recoleta-regular text-lg font-normal lg:text-2xl ">
        {{
          $t("order.steps.stepPurchase.title")
        }}
      </p>
    </div>
    <div class="flex flex-col items-center gap-5 mt-6 lg:flex-row lg:mt-4 lg:justify-center">
      <Button
        :class="[isSubscriptionPurchaseType ? 'bg-green-primary' : 'bg-transparent', 'text-xl']"
        :icon="shoppingCart.currentItem.purchaseType === SUBSCRIPTION_TYPE ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"
        icon-pos="right"
        outlined
        :label="$t('order.steps.stepPurchase.btn-subscription')"
        @click.prevent="setPurchaseType(SUBSCRIPTION_TYPE)"
      />
      <Button
        :class="[isOrderPurchaseType ? 'bg-green-primary' : 'bg-transparent', 'text-xl']"
        outlined
        :icon="shoppingCart.currentItem.purchaseType === ORDER_TYPE ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"
        icon-pos="right"
        :label="$t('order.steps.stepPurchase.btn-order')"
        @click.prevent="setPurchaseType(ORDER_TYPE)"
      />
    </div>
    <div
      v-if="isOrderPurchaseType"
      class="font-solina-extended-book text-base font-normal leading-6 mt-5 lg:grid lg:grid-cols-2"
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
      class="font-solina-extended-book text-base font-normal leading-6 mt-5 lg:grid lg:grid-cols-2"
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
        v-if="shoppingCart.currentItem?.purchaseType"
        severity="secondary"
        :label="$t('order.steps.stepPurchase.btn-continue')"
        @click.prevent="goToNextStep"
      />
    </div>
  </div>
  <ShoppingCartPurchaseSummaryFloating class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden" />
</template>
