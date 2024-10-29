<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps({
  order: {
    type: Object as () => Order,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  body: {
    type: Object,
    required: true,
  },
  formRef: {
    type: Object as () => HTMLFormElement | null,
    required: true,
  },
  paymentNotAvailable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:formRef', 'on-submit'])

const localFormRef = ref<HTMLFormElement | null>(null)

watch(localFormRef, (newVal) => {
  emit('update:formRef', newVal)
})
</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <form
      v-if="body"
      ref="localFormRef"
      :action="url"
      method="POST"
      class="OrderPaymentForm"
      @submit.prevent="emit('on-submit')"
    >
      <input
        :value="body.Ds_SignatureVersion"
        type="hidden"
        name="Ds_SignatureVersion"
      >
      <input
        :value="body.Ds_MerchantParameters"
        type="hidden"
        name="Ds_MerchantParameters"
      >
      <input
        :value="body.Ds_Signature"
        type="hidden"
        name="Ds_Signature"
      >
      <span
        v-if="paymentNotAvailable"
        class="help is-danger mt-4"
      >
        {{ $t('pages.order.status.paymentNotAvailable') }}
      </span>
      <Button
        type="submit"
        :disabled="disabled"
        :label="$t('pages.order.pay.pay')"
      />
    </form>
  </div>
</template>
