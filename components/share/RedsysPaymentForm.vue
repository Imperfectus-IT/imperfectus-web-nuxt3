<script setup lang="ts">
import { ref } from 'vue'
import { useSleep } from '~/composables/shared/useSleep.ts'
import { useFormPaymentHandler } from '~/composables/payment/application/form/useFormPaymentHandler.ts'

const props = defineProps({
  order: {
    type: Object as () => Order,
    required: false,
  },
})

const { url, body, formPaymentHandler } = useFormPaymentHandler()
const { executeGetFormWithoutCharge } = useGetFormWithoutCharge()

const { sleep } = useSleep()
const paymentNotAvailable = ref(false)
const formRef = ref<HTMLFormElement | null>(null)

const submit = async () => {
  paymentNotAvailable.value = false
  try {
    if (props.order?.id) {
      await formPaymentHandler(props.order.id)
      if (url.value && formRef.value) {
        await sleep(200)
        formRef.value.submit()
      }
      else {
        paymentNotAvailable.value = true
      }
    }
    else {
      await executeGetFormWithoutCharge()
      formRef.value.submit()
    }
  }
  catch (error) {
    console.info('orderpaymentform error')
    console.info(error.message)
  }
}

defineExpose({
  submit,
})
</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <form
      v-if="body"
      ref="formRef"
      :action="url"
      method="POST"
      class="OrderPaymentForm"
      @submit.prevent="submit"
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
        class="hidden"
        type="submit"
      />
      <slot />
    </form>
  </div>
</template>
