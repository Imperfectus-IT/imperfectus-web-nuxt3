<template>
  <div v-if="!subscription">cargando...</div>
  <div v-else class="lg:mt-12">
    <h4 class="font-recoleta-regular text-[40px]">Próximas entregas</h4>
    <p class="mt-3 mb-6">En esta sección puedes gestionar las entregas asociadas a tu suscripción. Puedes cancelar, donar o regalar cualquiera de tus próximos pedidos.</p>
    <Panel v-for="nextDeliveryDate in nextDeliveries" class="mt-2">
      <p class="text-[15px] font-solina-extended-book mb-3">
        Próxima entrega: {{ nextDeliveryDate }}
      </p>
      <OrderItemCard
        :order-item="subscriptions[0].subscriptionItems[0]"
        :order-status="''"
      />
      <div class="flex flex-col gap-2 mt-3">
        <Button :disabled="deactivateButtons" outlined label="Regalar a un amigx" />
        <Button outlined label="Donar a ONG" />
        <Button outlined label="Cancelar entrega" />
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
import dayjs from 'dayjs'

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

defineI18nRoute({
  paths: {
    es: "/mi-cuenta/suscripciones/proximas-entregas/[id]",
    ca: "/el-meu-compte/subscripcions/properes-entregues/[id]",
  },
});

const { subscriptions } = useGetSubscriptionsHandler();

const subscription = ref<Subscription>({} as Subscription);
const nextDeliveries = ref<string[]>([]);

const deactivateButtons = computed(() => {
  return dayjs(subscription.value?.nextPayment).isBefore(dayjs());
})

const getNextDatesFromFrequency = (frequency: string): string[] => {
  const upperLimit = dayjs(subscription.value?.nextPayment).add(6, 'months');
  let lowerLimit = dayjs(subscription.value?.nextPayment);
  const dates = [];
  if(frequency === 'weekly') {
    dates.push(lowerLimit.format('DD-MM-YYYY'))
    while( lowerLimit.isBefore(upperLimit)) {
      lowerLimit = lowerLimit.add(1, 'week');
      dates.push(lowerLimit.format('DD-MM-YYYY'))
    }
    dates.push(upperLimit.format('DD-MM-YYYY'))
  }
  return dates
}

watchEffect(() => {
  subscription.value = subscriptions.value.filter(
    (subscription: Subscription) => subscription.id === parseInt(route.params.id as string))[0]
    subscription ? nextDeliveries.value = getNextDatesFromFrequency(subscription.value?.frequency) : ''
});

</script>
