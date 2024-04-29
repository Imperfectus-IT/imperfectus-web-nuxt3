<script setup lang="ts">
const paymentMethods = [
  {
    id: useId(),
    cardNumber: "418811******2474",
    cardBrand: "VISA",
    expiryMonth: 12,
    expiryYear: 2025,
  },
  {
    id: useId(),
    cardNumber: "516811******3456",
    cardBrand: "MasterCard",
    expiryMonth: 4,
    expiryYear: 2027,
  }
]
</script>

<template>
  <Panel :header="$t('pages.admin.subscription.adminSubscriptionPaymentTitle')">
    <Divider/>
    <div v-for="item in paymentMethods" :key="item.id" class="flex flex-col gap-3 mb-5">
      <p class="font-solina-extended-book text-sm">
        {{ $t('adminSubscriptionPayment.cardNumber') }}: {{ item.cardNumber }}
      </p>
      <p class="font-solina-extended-book text-sm">
        {{ $t('adminSubscriptionPayment.cardBrand') }}: {{ item.cardBrand }}
      </p>
      <p class="font-solina-extended-book text-sm">
        {{ $t('adminSubscriptionPayment.expiryDate') }}: {{ item.expiryMonth }}/{{ item.expiryYear }}
      </p>
    </div>
    <div class="flex gap-8 mb-5">
      <NuxtLink class="underline underline-offset-2">{{ $t('adminSubscriptionUpdateItem.edit') }}</NuxtLink>
      <NuxtLink class="underline underline-offset-2">{{ $t('adminSubscriptionItems.remove') }}</NuxtLink>
    </div>
    <Button
        class="h-[3.125rem]" :label="$t('adminSubscriptionPayment.addPaymentMethod')"
        :pt="{ label: 'text-sm' }" outlined/>
  </Panel>
</template>