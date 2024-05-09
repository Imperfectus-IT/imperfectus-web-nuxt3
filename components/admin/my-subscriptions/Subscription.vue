<template>
  <Panel class="my-5">
    <div class="flex flex-row gap-1 justify-between">
      <Button :label="subscription.status" :pt="{ root:` bg-${backgroundColor()} py-1.5 px-2 rounded-lg text-[12px]`, label: '' }" />
      <Button outlined :label="'Identificador ' + subscription.id" :pt="{ label: 'text-[12px]', root: 'p-1.5 border-[green-tertiary] border-[1px] rounded-lg' }" />
      <Button outlined :label="frequency" :pt="{ label: 'text-[12px]', root: 'px-2 py-1.5 border-[green-tertiary] border-[1px] rounded-lg' }" />
    </div>

    <SubscriptionItemCard
      v-for="(orderItem, index) in subscription.subscriptionItems"
      :key="index"
      :order-item="orderItem"
      :next-payment="subscription.nextPayment"
      :preferred-day="subscription.preferredDay"
      class="mt-8"
    />

    <div class="flex justify-end">
      <Button v-if="subscription.status === 'active'" class="text-right mt-4" outlined :label="'Editar'" :pt="{ root: 'border-[1px] border-[green-tertiary] px-4  py-2 rounded-lg text-[14px]', label: '' }" />
    </div> 
    <Divider />
    
    <div class="-mt-2 text-[14px]" v-if="subscription.status === 'active'">
      <p class="leading-4">¿Quieres gestionar las entregas de esta suscripción?</p>
      <p class="leading-4 mt-2">En esta sección puedes cancelar, donar o regalar cualquiera de tus próximos pedidos</p>
      <Button primary :label="'Gestionar próximas entregas'" :pt="{root: 'bg-green-primary mt-4 border-[1px] border-green-tertiary px-3 py-2 rounded-lg', label: 'text-[14px]'}" />
    </div>

    <div class="-mt-2 text-[14px]" v-if="subscription.status === 'paused'">
      <p class="leading-4">Tu suscripción está pausada. Si quieres recibir la caja antes de la fecha elegida cuando la pausaste, reactiva la suscripción.</p>
      <p class="leading-4 mt-2"> Fecha de reactivación programada: </p>
      <p>{{ dayjs(props.subscription.nextPayment).format('DD-MM-YYYY') }}</p>
      <Button primary :label="'Reactivar suscripción'" :pt="{root: 'bg-green-primary mt-4 border-[1px] border-green-tertiary px-3 py-2 rounded-lg', label: 'text-[14px]'}" />
    </div>

    <div v-if="subscription.status === 'cancelled'">
      <p>Fecha de cancelación: {{ cancelDate }}</p>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { SubscriptionStatus } from './types/SubscriptionStatus';
import dayjs from 'dayjs'

const props = defineProps<{
  subscription: Subscription
}>();

console.log('subscription from props', props.subscription.status)

const frequency = computed (() => props.subscription.frequency === 'weekly' ? 'Semanal' : 'Quincenal')
// const status = computed(() => subscriptionStatuses[props.subscription.status as keyof SubscriptionStatus]);
const backgroundColor = (() => props.subscription.status === 'active' ? 'green-quaternary' : props.subscription.status === 'paused' ? 'orange-primary' : 'red-secondary' )

const subscriptionStatuses: SubscriptionStatus = {
  active: 'Activa',
  paused: 'Pausada',
  cancelled: 'Cancelada',
  failed: 'Failed'
}

const cancelDate = computed(() => dayjs(props.subscription.cancelledAt).format('DD/MM/YYYY'))

</script>
