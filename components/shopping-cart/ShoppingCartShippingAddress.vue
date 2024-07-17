<script setup lang="ts">
const { shoppingCart } = useShoppingCartState()
</script>

<template>
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
      {{ $t('orderMeta.shipping_fields.firstname') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.firstname"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.lastname') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.lastname"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.email') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.email"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.phone') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.phone"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.company') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.company"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.address1') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.address1"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.address2') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.address2"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.postalCode') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.postalCode"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.city') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.city"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.state') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.state"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.country') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.country"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.notes') }}
    </span>
    <Textarea
      v-model="shoppingCart.shippingAddress.notes"
      auto-resize
      rows="3"
      cols="30"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
</template>
