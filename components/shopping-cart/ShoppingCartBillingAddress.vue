<script setup lang="ts">
const {shoppingCart} = useShoppingCartState()
</script>

<template>
  <p class="mt-6 font-recoleta-regular text-xl font-normal w-full text-center lg:hidden">
    {{ $t(`orderMeta.billingAddressTitle`) }}
  </p>
  <div class="lg:col-span-2 lg:flex lg:flex-row lg:justify-end hidden ">
    <Button
        outlined
        :label="$t('orderMeta.cleanData')"
        :pt="{
            root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
            label: 'text-xs',
          }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.firstname') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.firstname"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.lastname') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.lastname"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.cif') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.cif"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.billing_company') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.company"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.email') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.email"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.phone') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.phone"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.company') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.company"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.address1') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.address1"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.address2') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.address2"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.postalCode') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.postalCode"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.city') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.city"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.state') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.state"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
  <div>
        <span class="font-bold text-[14px]">
            {{ $t('orderMeta.billing_fields.country') }}
          </span>
    <InputText
        v-model="shoppingCart.billingAddress.country"
        class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
        :pt="{
              root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
            }"
    />
  </div>
</template>
