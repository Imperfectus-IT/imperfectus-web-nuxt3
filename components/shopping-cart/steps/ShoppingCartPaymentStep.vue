<script setup lang="ts">
const emit = defineEmits([GO_TO_STEP_EVENT])
const { t } = useI18n()
const { shoppingCart } = useShoppingCartState()

const paymentMethods = [
  {
    label: t('order.steps.stepPayment.methodType.debit'),
    value: 'redsys',
  },
]
const checkOptions = ['termConditions', 'whatsappInfo', 'marketingInfo']

const handlePayment = async (submitForm) => {
  setTimeout(async () => {
    await submitForm()
  }, 500)
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[2%] 2xl:px-[20%] relative">
    <div class="flex items-center justify-center gap-3 lg:mt-14">
      <div class="!absolute left-5 flex flex-row gap-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="emit(GO_TO_STEP_EVENT, DELIVERY_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
      <p class="font-recoleta-regular text-lg font-normal text-center w-2/3 lg:text-2xl lg:hidden">
        {{
          $t("order.steps.stepPayment.title")
        }}
      </p>
    </div>
    <div class="lg:flex gap-5">
      <div class="my-auto lg:border-[1px] lg:rounded-lg lg:px-14 lg:py-8 lg:w-[57%] lg:mt-14">
        <p class="font-recoleta-regular text-lg font-normal text-center lg:text-xl hidden lg:block">
          {{
            $t("order.steps.stepPayment.title")
          }}
        </p>
        <div
          v-for="paymentMethod in paymentMethods"
          :key="paymentMethod.value"
          class="mt-5"
        >
          <RadioButton
            v-model="paymentMethod.value"
            input-id="paymentMethod"
            name="paymentMethod"
            :value="paymentMethod.value"
          />
          <label
            for="paymentMethod"
            class="ml-2 text-xs font-normal leading-5"
          >{{ paymentMethod.label }}
          </label>
        </div>
        <div class="flex items-center gap-3 mt-5">
          <NuxtImg
            alt="google_icon"
            format="webp"
            loading="lazy"
            src="/images/logos/payment/google.webp"
            class="w-[50px] "
          />
          <NuxtImg
            alt="apple_icon"
            format="webp"
            loading="lazy"
            src="/images/logos/payment/apple.webp"
            class="w-[50px] h-[20px]"
          />
        </div>
        <Divider class="text-grey-secondary" />
        <div class="mt-5">
          <div
            v-for="checkOption in checkOptions"
            :key="checkOption"
            class="flex"
          >
            <Checkbox
              :id="checkOption"
              v-model="shoppingCart[checkOption]"
              class="basis-8"
              name="checkOption"
              binary
            />
            <MDC
              class="ml-2 basis-full"
              :value="$t(`order.steps.stepPayment.${checkOption}`)"
            />
          </div>
          <RedsysPaymentForm
            :is-button-outlined="false"
            :order="72006"
            @redirect="(submit) => handlePayment(submit)"
          >
            {{ $t('gift-card.payment.form.repeat-submit') }}sss
          </RedsysPaymentForm>
        </div>
      </div>
      <div class="hidden my-auto lg:block lg:border-[1px] lg:rounded-lg lg:px-14 lg:py-8 mt-14">
        <ShoppingCartSummaryBox>
          <template #title>
            <h3 class="font-recoleta-semibold text-center text-xl font-medium mb-3">
              {{ $t('order.steps.stepResume') }}
            </h3>
          </template>
        </ShoppingCartSummaryBox>
      </div>
    </div>
  </div>
</template>
