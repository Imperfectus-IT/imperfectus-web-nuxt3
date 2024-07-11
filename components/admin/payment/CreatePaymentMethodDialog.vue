<template>
  <Dialog
    :visible="isVisible"
    modal
    :closable="false"
    :dismissable-mask="true"
    :header="$t(`${textData.section}title`)"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :pt="{
      root: 'bg-beige-primary rounded-lg text-green-tertiary lg:w-[800px] lg:px-28 lg:py-10',
      header: 'font-recoleta-regular text-green-tertiary text-center py-4',
      title: 'text-[30px]',
      content: '',
    }"
    class="px-6 w-full"
  >
    ssss
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean
}>()
const emits = defineEmits(['close-dialog', 'add-payment'])
const textData = {
  section: '',
}
const newPaymentData = reactive<Payment>({

})
const closeDialog = () => {
  emits('close-dialog')
}
const addPayment = () => emits('add-payment', newPaymentData)
</script>
