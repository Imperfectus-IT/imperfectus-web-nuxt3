<template>
  <Panel
    :header="$t(`subscriptions.subscription.shipping.title`)"
    toggleable
    collapsed
  >
    <div
      v-for="(key, index) in getShippingKeys"
      :key="key"
      class="mt-3"
    >
      <div v-if="key !== 'shippingNotes'">
        <span class="font-bold text-[14px]">
          {{ $t(`subscriptions.subscription.shipping.item_${index}`) }}
        </span>
        <InputText
          v-model="shippingForm[key as keyof SubscriptionShipping]"
          class="mt-2 rounded-lg w-full mb-4"
          :pt="{
            root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
          }"
        />
      </div>
      <div v-else>
        <span class="font-bold text-[14px]">
          {{ $t(`subscriptions.subscription.shipping.item_${index}`) }}
        </span>
        <Textarea
          v-model="shippingForm[key as keyof SubscriptionShipping]"
          class="w-full text-[16px] mt-2 rounded-lg mb-4"
          rows="5"
        />
      </div>
    </div>
    <Button
      :label="$t(`subscriptions.subscription.billing.button`)"
      class="mt-3"
      @click="modifySubscriptionShipping"
    />
  </Panel>
</template>

<script setup lang="ts">
import type { SubscriptionShipping } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  shipping: SubscriptionShipping
}>()

const emits = defineEmits(['modifyShipping'])

const getShippingKeys = computed(() => Object.keys(props.shipping))

const shippingForm = reactive<SubscriptionShipping>({
  shippingAddress: props.shipping.shippingAddress,
  shippingCity: props.shipping.shippingCity,
  shippingCountry: props.shipping.shippingCountry,
  shippingAddress2: props.shipping.shippingAddress2,
  shippingState: props.shipping.shippingState,
  shippingEmail: props.shipping.shippingEmail,
  shippingFirstName: props.shipping.shippingFirstName,
  shippingPhone: props.shipping.shippingPhone,
  shippingLastName: props.shipping.shippingLastName,
  shippingPostCode: props.shipping.shippingPostCode,
  shippingNotes: props.shipping.shippingNotes,
})

const modifySubscriptionShipping = () => {
  emits('modifyShipping', shippingForm)
}
</script>
