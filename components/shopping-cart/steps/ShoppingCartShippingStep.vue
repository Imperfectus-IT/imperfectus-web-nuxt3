<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BillingAddress, ShippingAddress } from '~/composables/shopping_cart/types/ShoppingCartType.ts'
import { DELIVERY_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const { t } = useI18n()
const textData = {
  shippingSection: 'shopping_cart.shippingStep.',
  billingSection: 'shopping_cart.billingStep.',
  shippingFields: 11,
  billingFields: 11,
}
const { shoppingCart } = useShoppingCartState()
const emit = defineEmits(['goToStep'])
const getShippingAddressKey = (item: number): keyof ShippingAddress => {
  return t(`${textData.shippingSection}field_${item}.value`) as keyof ShippingAddress
}
const getBillingAddressKey = (item: number): keyof BillingAddress => {
  return t(`${textData.billingSection}field_${item}.value`) as keyof BillingAddress
}
const isBillingFormDisplayed = ref(false)
</script>

<template>
  <div class="px-10">
    <div class="flex items-center justify-center gap-3 mt-3 relative">
      <div class="!absolute left-0 flex flex-row gap-3 lg:mt-4">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
        />
        <span class="my-auto hidden lg:block">Volver</span>
      </div>
      <p class="font-recoleta-regular text-xl font-normal text-center w-2/3 lg:hidden">
        {{
          $t(`shopping_cart.shippingStep.title`)
        }}
      </p>
    </div>
    <div class="flex justify-end lg:hidden">
      <Button
        outlined
        :label="$t(`${textData.shippingSection}clean`)"
        :pt="{
          root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
          label: 'text-xs',
        }"
      />
    </div>
    <div class="lg:border-[1px] lg:rounded-lg lg:w-1/2 lg:p-8 lg:grid lg:grid-cols-2 lg:gap-4 lg:mt-12">
      <p class="lg:col-span-2 lg:mx-auto lg:text-2xl lg:font-recoleta-regular hidden lg:block">
        {{ $t(`shopping_cart.shippingStep.title`) }}
      </p>
      <div class="lg:col-span-2 lg:flex lg:flex-row lg:justify-end hidden ">
        <Button
          outlined
          :label="$t(`${textData.shippingSection}clean`)"
          :pt="{
            root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
            label: 'text-xs',
          }"
        />
      </div>
      <div
        v-for="item in textData.shippingFields"
        :key="item"
        class="mt-3"
        :class="item !== 11 ? 'lg:col-span-1' : 'lg:col-span-2'"
      >
        <div v-if="item !== 11">
          <span class="font-bold text-[14px]">
            {{ $t(`${textData.shippingSection}field_${item}.label`) }}
          </span>
          <InputText
            v-model="shoppingCart.shippingAddress[getShippingAddressKey(item)]"
            class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
            :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
          />
        </div>
        <div
          v-else
          class="lg:col-span-2"
        >
          <span class="font-bold text-[14px]">
            {{ $t(`${textData.shippingSection}field_${item}.label`) }}
          </span>
          <Textarea
            v-model="shoppingCart.shippingAddress[getShippingAddressKey(item)]"
            :pt="{
              root: 'border-[1px] bg-transparent',
            }"
            rows="4"
            class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center lg:mt-4">
      <Checkbox
        v-model="isBillingFormDisplayed"
        :binary="true"
        :pt="{
          box: 'h-4 w-4 border-[1px] rounded-sm my-auto mx-auto text-green-tertiary',
          icon: 'text-green-tertiary',
        }"
      />
      <label
        for="ingredient1"
        class="text-xs"
      >  {{ $t(`${textData.shippingSection}checkbox`) }} </label>
    </div>
    <!--    BILLING FORM -->
    <div
      v-if="isBillingFormDisplayed"
      class="mt-7 lg:w-1/2 lg:border-[1px] lg:rounded-lg lg:p-8 lg:mt-12"
    >
      <p class="font-recoleta-regular text-xl font-normal w-full text-center lg:text-2xl">
        {{
          $t(`${textData.billingSection}title`)
        }}
      </p>
      <div class="flex justify-end">
        <Button
          outlined
          :label="$t(`${textData.shippingSection}clean`)"
          :pt="{
            root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
            label: 'text-xs',
          }"
        />
      </div>
      <div class="lg:grid lg:grid-cols-2 lg:gap-4">
        <div
          v-for="item in textData.billingFields"
          :key="item"
          class="mt-3"
        >
          <span class="font-bold text-[14px]">
            {{ $t(`${textData.billingSection}field_${item}.label`) }}
          </span>
          <InputText
            v-model="shoppingCart.billingAddress[getBillingAddressKey(item)]"
            class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
            :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <Button
        severity="secondary"
        :label="$t(`${textData.billingSection}button`)"
        @click.prevent="$emit('goToStep', DELIVERY_STEP)"
      />
    </div>
  </div>
</template>
