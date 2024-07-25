<script setup lang="ts">
const { shoppingCart } = useShoppingCartState()
const { isInvalid, findCoverageByPostalCode, goBack } = useShoppingCartAvailabilityStep()
const { MAX_POSTAL_CODE_LENGTH } = useLocationValidator()

defineEmits([GO_TO_STEP_EVENT])
watch(
  () => shoppingCart.value.shippingAddress.postalCode,
  findCoverageByPostalCode,
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
          @click.prevent="goBack"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
    </div>
    <div class="text-center mt-10 lg:mt-0">
      <p class="font-recoleta-regular text-lg font-normal lg:text-2xl">
        {{
          $t("order.steps.stepAvailability.title")
        }}
      </p>
      <p class="font-solina-extended-book text-base font-normal p-5 lg:text-[20px]">
        {{
          $t("order.steps.stepAvailability.subTitle")
        }}
      </p>
      <InputOtp
        v-model="shoppingCart.shippingAddress.postalCode"
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
    <div class="flex justify-center mt-5">
      <Button
        v-if="!isInvalid"
        class="mt-4"
        :disabled="isInvalid"
        severity="secondary"
        :label="$t('order.next')"
        @click.prevent="$emit(GO_TO_STEP_EVENT, PURCHASE_TYPE_STEP)"
      />
    </div>
  </div>
</template>
