<template>
  <form
    ref="redsys"
    :action="url"
    method="POST"
    @submit.prevent="submitForm"
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
      v-if="!isPaymentAvailable"
      class="mt-4"
    >{{ $t('pages.order.status.paymentNotAvailable') }}</span>
    <Button
      :outlined="isButtonOutlined"
      class="w-full"
      @click="emitRedirect"
    >
      <b>
        <slot />
      </b>
    </Button>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(['redirect', 'onError'])
const props = defineProps<{
  order: number | null
  isButtonOutlined: boolean
}>()

const body = reactive({
  Ds_SignatureVersion: null,
  Ds_MerchantParameters: null,
  Ds_Signature: null,
})
const isPaymentAvailable = ref(true)
const url = ref(null)
const redsys = ref(null)

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const submitForm = async (): Promise<void> => {
  try {
    console.log('orderpaymentform')
    const client = useStrapiClient()
    isPaymentAvailable.value = true
    let data
    if (props.order) {
      data = await client(`/payments/${props.order}/form/`, { method: 'POST' })
    }
    else {
      data = await client('/payments/form/', {
        method: 'POST',
      })
    }
    if (data.url) {
      url.value = data.url
      body.Ds_SignatureVersion = data.body.Ds_SignatureVersion
      body.Ds_MerchantParameters = data.body.Ds_MerchantParameters
      body.Ds_Signature = data.body.Ds_Signature
      await sleep(200)
      await redsys.value.submit()
    }
    else {
      isPaymentAvailable.value = false
    }
  }
  catch (error) {
    console.info('orderpaymentform error')
    console.info(error.message)
    this.$emit('onError')
  }
}

const emitRedirect = () => {
  emit('redirect', submitForm)
}
</script>
