<template>
  <form
    ref="redsys"
    :action="url"
    method="POST"
    class="OrderPaymentForm"
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
const env = useRuntimeConfig()
onMounted(() => {
  console.log('test', env)
})

const props = defineProps<{
  order: number
  disabled: boolean
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
    isPaymentAvailable.value = true
    const data = await $fetch(`${env.public.STRAPI_URL}/payments/${props.order}/form/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
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
