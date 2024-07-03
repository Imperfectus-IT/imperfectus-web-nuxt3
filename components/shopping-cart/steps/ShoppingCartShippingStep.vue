<script setup lang="ts">
import {DELIVERY_STEP} from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const {shoppingCart} = useShoppingCartState()
const emit = defineEmits(['goToStep'])
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
          $t(`orderMeta.shippingAddressTitle`)
        }}
      </p>
    </div>
    <div class="flex justify-end lg:hidden">
      <Button
          outlined
          :label="$t('orderMeta.cleanData')"
          :pt="{
          root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
          label: 'text-xs',
        }"
      />
    </div>
    <div class="lg:border-[1px] lg:rounded-lg lg:w-1/2 lg:p-8 lg:grid lg:grid-cols-2 lg:gap-4 lg:mt-12">
      <ShoppingCartShippingAddress />
      <div class="flex items-center lg:mt-4">
        <Checkbox
            v-model="shoppingCart.invoiceRequired"
            :binary="true"
            :pt="{
          box: 'h-4 w-4 border-[1px] rounded-sm my-auto mx-auto text-green-tertiary',
          icon: 'text-green-tertiary',
        }"
        />
        <label
            for="invoiceRequired"
            class="text-xs"
        > {{ $t('orderMeta.isBillingMetaDifferent') }} </label>
      </div>
      <ShoppingCartBillingAddress v-if="shoppingCart.invoiceRequired" />
    </div>
    <div class="flex justify-center lg:justify-end mt-4 lg:w-2/4">
      <Button
          severity="secondary"
          :label="$t('orderMeta.continue')"
          @click.prevent="$emit('goToStep', DELIVERY_STEP)"
      />
    </div>
  </div>
</template>
