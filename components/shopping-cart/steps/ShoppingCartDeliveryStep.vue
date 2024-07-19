<script setup lang="ts">
const emit = defineEmits(['goToStep'])
const { shoppingCart } = useShoppingCartState()
const { t } = useI18n()
const deliveryType = ref(PICKUP_POINT_DELIVERY_TYPE)

const carrierOptions = ['mensakas', 'paack', 'correosexp', 'seur', 'ctt', 'talkual']
const pickupCarrierOptions = [
  {
    label: t('orderStepDate.carrier.seur'),
    value: 'seur',
  }
]
const pickupPointList = [
  {
    id: 1,
    address: 'OF.CORREOS: BARCELONA. PS. SANT JOAN, 196, Barcelona, Barcelona, 08037',
  },
  {
    id: 2,
    address: 'OF.CORREOS: BARCELONA. PS. SANT JOAN, 196, Barcelona, Barcelona, 08037',
  }
]
const timeOptions = [
  {
    label: t('orderStepDate.timePreferenceOption1'),
    value: 'full',
  },
  {
    label: t('orderStepDate.timePreferenceOption2'),
    value: 'morning',
  },
  {
    label: t('orderStepDate.timePreferenceOption3'),
    value: 'afternoon',
  },
  {
    label: t('orderStepDate.timePreferenceOption4'),
    value: 'night',
  },
]
</script>

<template>
  <div class="px-5 md:px-[28%] lg:px-[2%] 2xl:px-[20%] relative">
    <div class="flex items-center justify-center gap-3 lg:mt-14">
      <div class="!absolute left-5 flex flex-row gap-3 mt-5">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="emit('goToStep', DELIVERY_DATE_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
    </div>
    <div class="lg:flex gap-5">
      <div class="my-auto lg:border lg:rounded-lg lg:px-14 lg:py-8 lg:w-[57%] mt-10 lg:mt-14 font-solina-extended-book text-xs leading-5"
      >
        <div class="border rounded-lg lg:border-green-tertiary/50 p-4">
          <div class="flex justify-between items-center">
            <span>Aurora Beatrici</span>
            <NuxtLink class="text-[0.625rem] underline font-semibold leading-4">
              {{ $t('orderStepDate.address.update') }}
            </NuxtLink>
          </div>
          <Divider class="text-grey-secondary" />
          <p class="leading-5">
            Calle del Tossal Blanc 36, 25230, Mollerussa España
          </p>
        </div>
        <div class="mt-6">
          <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
            {{ $t('orderStepDate.nextDeliveryDay.methodType.title') }}
          </p>
          <InputGroup>
            <Button
              :class="['w-1/2 rounded-none rounded-l-xl h-[34px]', { 'bg-green-primary': deliveryType === PICKUP_POINT_DELIVERY_TYPE }]"
              :label="$t('orderStepDate.nextDeliveryDay.methodType.pickup')"
              outlined
              @click.prevent="deliveryType = PICKUP_POINT_DELIVERY_TYPE"
            />
            <Button
              :class="['w-1/2 rounded-none rounded-r-xl h-[34px]', { 'bg-green-primary': deliveryType === HOME_DELIVERY_TYPE }]"
              :label="$t('orderStepDate.nextDeliveryDay.methodType.home')"
              outlined
              @click.prevent="deliveryType = HOME_DELIVERY_TYPE"
            />
          </InputGroup>
        </div>
        <div
          v-if="deliveryType === HOME_DELIVERY_TYPE"
          class="mt-6"
        >
          <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
            {{ $t('orderStepDate.carrier.label') }}
          </p>
          <div>
            <div
              v-for="carrier in carrierOptions"
              :key="carrier"
              :class="['flex items-center mb-3 border cursor-pointer rounded-xl lg:w-2/3 p-3', { 'border-green-primary': shoppingCart.coverage === carrier }]"
              @click.prevent="shoppingCart.coverage = carrier"
            >
              <RadioButton
                v-model="shoppingCart.coverage"
                input-id="ingredient1"
                name="coverage"
                :value="carrier"
              />
              <label
                for="coverage"
                class="ml-2 text-xs font-normal leading-5"
              >{{ $t(`orderStepDate.carrier.${carrier}`) }}</label>
              <span
                v-if="shoppingCart.coverage === carrier"
                class="mdi mdi-star text-lg text-green-primary ml-3"
              />
            </div>
            <div class="flex items-center gap-1">
              <span class="mdi mdi-star text-xl text-green-primary" />
              <p class="text-xs lg:text-base">
                {{ $t('Empresa de transporte recomendada según tu CP') }}
              </p>
            </div>
          </div>
          <div class="mt-6">
            <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
              {{ $t('orderStepDate.time') }}
            </p>
            <Dropdown
                v-model="shoppingCart.preferredHour"
                :options="timeOptions"
                option-label="label"
                option-value="value"
                class="lg:w-full text-base"
            />
          </div>
        </div>
        <div v-if="deliveryType === PICKUP_POINT_DELIVERY_TYPE"
             class="mt-6">
          <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
            {{ $t('orderStepDate.time') }}
          </p>
          <Dropdown
              v-model="shoppingCart.coverage"
              :options="pickupCarrierOptions"
              option-label="label"
              option-value="value"
              class="lg:w-full text-base border rounded-lg"
          />
          <div class="mt-6">
            <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
              {{ $t('orderStepDate.carrier.preferredPickup') }}
            </p>
            <MDC class="bg-orange-primary p-4 leading-4 rounded-lg my-6" :value="$t('orderStepDate.carrier.caution')" />
            <div
                v-for="pickupPoint in pickupPointList"
                :key="pickupPoint.id"
                class="mb-3 cursor-pointer lg:w-2/3"
                @click.prevent="shoppingCart.shippingAddress.address1 = pickupPoint.id"
            >
              <RadioButton
                  v-model="shoppingCart.shippingAddress.address1"
                  input-id="pickupPoint"
                  name="pickupPoint"
                  :value="pickupPoint.id"
              />
              <label
                  for="coverage"
                  class="ml-2 text-xs font-normal leading-5"
              >{{ pickupPoint.address }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="my-auto hidden lg:block lg:border-[1px] lg:rounded-lg lg:px-14 lg:py-8 mt-14">
        <ShoppingCartSummaryBox>
          <template #title>
            <h3 class="font-recoleta-semibold text-center text-xl font-medium mb-3">
              {{
                $t('order.steps.stepResume')
              }}
            </h3>
          </template>
        </ShoppingCartSummaryBox>
      </div>
      <ShoppingCartPurchaseSummaryFloating
        class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden"
        :item="shoppingCart.currentItem"
      />
    </div>
    <div class="flex justify-center lg:mt-6">
      <Button
        class="mt-4"
        severity="secondary"
        :label="$t('order.next')"
        @click.prevent="$emit('goToStep', PAYMENT_STEP)"
      />
    </div>
  </div>
</template>
