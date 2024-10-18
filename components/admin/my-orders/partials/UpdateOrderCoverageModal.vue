<template>
  <Dialog
    :visible="isVisible"
    modal
    :closable="false"
    :dismissable-mask="true"
    :header="'Modificación pedido'"
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
    <p>Has modificado tu pedido correctamente. </p>
    <p
      v-if="props.subscription"
      class="mt-2"
    >
      Si quieres modificar también tu suscripción activa, haz click aquí:
      <NuxtLink :to="`/mi-cuenta/suscripciones/${getSubscriptionId}`">
        {{ getSubscriptionId }}
      </NuxtLink>
    </p>
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
  subscription: Subscription
  isVisible: boolean
}>()

const { subscriptions } = useSubscriptionsState()
const emits = defineEmits(['close-modal'])
const handleCloseMoodal = () => {
  emits('close-modal')
}
const getSubscriptionId = computed(() => {
  console.log('subscriptions', subscriptions.value)
  const subscription = subscriptions.value.find((subscription: Subscription) => {
    console.log(subscription.id, props.subscription)
    return subscription.id === props.subscription
  })
  return subscription ? subscription.subscriptionId : null
})
console.log('log', getSubscriptionId.value)
</script>
