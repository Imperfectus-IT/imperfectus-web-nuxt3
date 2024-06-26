<template>
  <Panel
    :header="'Dirección de facturación'"
    toggleable
  >
    <div
      v-for="(key, index) in getBillingKeys"
      :key="key"
      class="mt-3"
    >
      <span class="font-bold text-[14px]">
        {{ $t(`subscriptions.subscription.billing.item_${index}`) }}
      </span>
      <InputText
        v-model="billingForm[key as keyof SubscriptionBilling]"
        class="mt-2 rounded-lg w-full mb-4"
        :pt="{
          root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
        }"
      />
    </div>
    <Button
      :label="$t(`subscriptions.subscription.billing.button`)"
      class="mt-3"
      @click="modifySubscriptionBilling"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { SubscriptionBilling } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  billing: SubscriptionBilling
}>()

const emits = defineEmits(['modifyBilling'])

const getBillingKeys = computed(() => Object.keys(props.billing))

const billingForm = reactive<SubscriptionBilling>({
  billingAddress: props.billing.billingAddress,
  billingCity: props.billing.billingCity,
  billingCountry: props.billing.billingCountry,
  billingAddress2: props.billing.billingAddress2,
  billingState: props.billing.billingState,
  billingCif: props.billing.billingCif,
  billingEmail: props.billing.billingEmail,
  billingFirstName: props.billing.billingFirstName,
  billingPhone: props.billing.billingPhone,
  billingLastName: props.billing.billingLastName,
  billingPostCode: props.billing.billingPostCode,
})

const modifySubscriptionBilling = () => {
  emits('modifyBilling', billingForm)
}
</script>
