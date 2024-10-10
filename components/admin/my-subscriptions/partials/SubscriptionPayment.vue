<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium whitespace-normal">
      {{ $t(`${textData.section}title`) }}
    </h4>
    <Divider />
    <p
      v-for="(item, index) in textData.items"
      :key="index"
      class="text-[14px] mb-3"
    >
      {{ $t(`${textData.section}option_${index}`, item.params) }}
    </p>

    <Dropdown
      v-model="paymentId"
      :options="getLabelsForDropdown()"
      option-label="label"
      option-value="value"
      @change="handlePaymentChange"
    />
    <RedsysPaymentForm
      ref="redsys"
      class="mt-6 w-1/3"
      :order="null"
      :is-button-outlined="true"
      @redirect="handleAddPayment"
    >
      {{ $t("profile.payment.addButton") }}
    </RedsysPaymentForm>
  </Panel>
</template>

<script setup lang="ts">
import type { Payment } from '~/composables/payment/domain/Payment.ts'

const props = defineProps<{
  payment: Payment
}>()
const { payments } = useGetAllPaymentsHandler()
const paymentId = ref<number>(props.payment.id)
const emits = defineEmits(['paymentChanged'])

const getLabelsForDropdown = () => {
  return payments.value.map((payment: Payment) => ({
    label: `${payment.cardBrand} - ${payment.cardNumber} - ${payment.expiryMonth}/${payment.expiryYear}`,
    value: payment.id,
  }))
}

const handlePaymentChange = () => {
  emits('paymentChanged', paymentId.value)
}

const handleAddPayment = async (submit) => {
  await submit()
}

const textData = {
  section: 'subscriptions.subscription.payment.',
  items: [
    { params: { card: props.payment.cardNumber } },
    { params: { cardType: props.payment.cardBrand } },
    { params: { expiration: props.payment.expiryMonth + '/' + props.payment.expiryYear } },
  ],
}
</script>
