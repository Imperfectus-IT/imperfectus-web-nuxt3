<template>
  <Dialog
    :visible="isVisible"
    modal
    :closable="false"
    :dismissable-mask="true"
    :header="'Edición en tu suscripción'"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :pt="{
      root: 'bg-beige-primary rounded-lg text-green-tertiary py-2ip addr showip addr showip addr showip addr show lg:w-[900px] lg:p-10',
      header: 'font-recoleta-regular text-green-tertiary py-1',
      title: 'text-[30px]',
      content: '',
    }"
    class="px-6 w-full"
  >
    <Divider class="mt-0" />
    <p>Te recordamos que estás editando tu suscripción. Este cambio de empresa de transporte se aplicará <span class="font-bold">en todos tus siguientes pedidos.</span>  </p>

    <div class="flex justify-center mt-4">
      <Button
        class="mt-3 text-center"
        label="OK"
        outlined
        @click="handleCloseMoodal"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  subscriptionId: number
  isVisible: boolean
}>()

const { subscriptions } = useSubscriptionsState()
const emits = defineEmits(['close-modal'])
const handleCloseMoodal = () => {
  emits('close-modal')
}
const getSubscriptionId = computed(() => {
  const subscription = subscriptions.value.find((subscription: Subscription) => {
    return subscription.id === props.subscriptionId
  })
  return subscription ? subscription.subscriptionId : null
})
</script>
