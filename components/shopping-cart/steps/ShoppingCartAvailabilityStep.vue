<script setup lang="ts">
import { PURCHASE_TYPE_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const { shoppingCart } = useShoppingCartState()
const { executeFindCoverageByPostalCode } = useFindCoverageByPostalCode()
const {
  MAX_POSTAL_CODE_LENGTH,
  isPostalCodeLengthValid,
  isCoverageValid,
} = useLocationValidator()

const isInvalid = computed(() => !isPostalCodeLengthValid(shoppingCart.value.shippingAddress.shippingPostalCode) || !isCoverageValid(shoppingCart.value.coverage))
const emit = defineEmits(['goToStep'])
watch(
  () => shoppingCart.value.shippingAddress.shippingPostalCode,
  async (postalCode) => {
    if (!isPostalCodeLengthValid(postalCode)) {
      return
    }
    const query: LocationQuery = {
      postcode: Number(postalCode),
      deliveryDate: shoppingCart.value.deliveryDate,
    }
    shoppingCart.value.coverage = await executeFindCoverageByPostalCode(query)
    if (isCoverageValid(shoppingCart.value.coverage)) {
      emit('goToStep', PURCHASE_TYPE_STEP)
    }
  },
)
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[20%] 2xl:px-[20%] lg:relative">
    <div class="flex items-center lg:justify-center gap-3">
      <div class="lg:absolute lg:left-5 lg:flex lg:flex-row lg:gap-3 lg:mt-10">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
        />
        <span class="my-auto hidden lg:block">Volver</span>
      </div>
    </div>
    <div class="text-center lg:mt-0">
      <p class="font-recoleta-regular text-lg font-normal lg:text-2xl">
        {{
          $t("order.steps.stepAvailability.title")
        }}
      </p>
      <p class="font-solina-extended-book text-base font-normal p-6 lg:text-[20px]">
        {{
          $t("order.steps.stepAvailability.subTitle")
        }}
      </p>
      <InputOtp
        v-model="shoppingCart.shippingAddress.shippingPostalCode"
        class="mt-4"
        :pt="{
          input: 'text-[40px]',
        }"
        :length="MAX_POSTAL_CODE_LENGTH"
        :invalid="isInvalid"
        integer-only
      />
    </div>
    <NuxtImg
      src="/images/steps/availability/Ipad2_Dark1.webp"
      format="webp"
      loading="lazy"
      class="hidden lg:block mx-auto w-[400px] mt-10"
    />
  </div>
</template>
