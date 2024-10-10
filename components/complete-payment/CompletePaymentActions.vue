<script setup lang="ts">
import { ref } from 'vue'
import { useSleep } from '~/composables/shared/useSleep.ts'
import { useFormPaymentHandler } from '~/composables/payment/form/useFormPaymentHandler.ts'

const props = defineProps({
  order: {
    type: Object as () => Order,
    required: true,
  },
})

const { url, body, formPaymentHandler } = useFormPaymentHandler()

const { sleep } = useSleep()
const paymentNotAvailable = ref(false)
const formRef = ref<HTMLFormElement | null>(null)

const submit = async () => {
  paymentNotAvailable.value = false
  try {
    await formPaymentHandler(props.order.id)

    if (url.value && formRef.value) {
      await sleep(200)
      console.info('submitting form')
      formRef.value.submit()
    }
    else {
      paymentNotAvailable.value = true
    }
  }
  catch (error) {
    console.info('orderpaymentform error')
    console.info(error.message)
  }
}
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
        class=""
        type="submit"
        :label="$t('pages.order.pay.pay')"
      />
    </form>
  </div>
</template>
