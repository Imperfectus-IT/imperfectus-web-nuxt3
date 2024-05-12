<script setup lang="ts">
const addresses = [
  {
    id: useId(),
    billing_address1: 'Calle Margarita',
    billing_address2: '45, 1A',
    billing_postcode: 28005,
    billing_city: 'Madrid',
    shipping_address1: 'Calle Amalgama',
    shipping_address2: '105, 2B',
    shipping_postcode: 28015,
    shipping_city: 'Madrid',
  },
]
</script>

<template>
  <Panel
    :header="$t('profile.address.title')"
    :pt="{
      title: 'font-recoleta-medium text-xl font-medium leading-5',
    }"
  >
    <Divider class="lg:invisible" />
    <div
      v-for="item in addresses"
      :key="item.id"
      class="flex flex-col gap-3 mb-5"
    >
      <p class="font-solina-extended-book text-sm">
        {{ $t('profile.address.street') }}: {{ item.billing_address1 }}
      </p>
      <p class="font-solina-extended-book text-sm">
        {{ $t('profile.address.floor') }}: {{ item.billing_address2 }}
      </p>
      <p class="font-solina-extended-book text-sm">
        {{ $t('profile.address.postal_code') }}: {{ item.billing_postcode }}
      </p>
      <p class="font-solina-extended-book text-sm">
        {{ $t('profile.address.city') }}: {{ item.shipping_city }}
      </p>
    </div>
    <div class="flex gap-8 mb-5">
      <NuxtLink class="underline underline-offset-2">
        {{ $t('adminSubscriptionUpdateItem.edit') }}
      </NuxtLink>
      <NuxtLink class="underline underline-offset-2">
        {{ $t('adminSubscriptionItems.remove') }}
      </NuxtLink>
    </div>
    <Divider class="invisible lg:visible !my-0 !mb-8" />
    <Button
      class="h-[3.125rem] lg:w-64"
      :label="$t('profile.address.add_address_button')"
      :pt="{ label: 'text-sm lg:text-lg' }"
      outlined
    />
  </Panel>
</template>
