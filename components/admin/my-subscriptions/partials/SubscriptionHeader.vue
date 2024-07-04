<template>
  <div class="flex flex-row gap-1 justify-start lg:gap-4 lg:mt-6 relative lg:items-center">
    <Button
      :label="status"
      :pt="{
        root: ` bg-${backgroundColor()} py-1.5 px-4 rounded-lg text-[12px] lg:px-8 lg:h-9 cursor-default`,
        label: '',
      }"
    />
    <Button
      outlined
      :label="'ID ' + subscription.id"
      :pt="{
        label: 'text-[12px]',
        root: 'px-4 py-1.5 bg-grey-quaternary bg-opacity-50 rounded-lg lg:px-8 lg:h-9 cursor-default',
      }"
    />
    <Button
      outlined
      :label="frequency"
      :pt="{
        label: 'text-[12px]',
        root: 'px-4 py-1.5 bg-grey-quaternary bg-opacity-50 rounded-lg lg:px-8 cursor-default',
      }"
    />
    <p
      v-if="subscription.status === 'cancelled'"
      class="mt-5 lg:order-3 text-[14px] hidden lg:block lg:mt-0 lg:relative left-[35%] "
    >
      Fecha de cancelación: {{ subscription.cancelDate }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { SubscriptionStatus } from '~/components/admin/my-subscriptions/types/SubscriptionStatus.ts'

const props = defineProps<{
  subscription: Subscription
}>()

const backgroundColor = () =>
  props.subscription.status === 'active'
    ? 'green-quaternary'
    : props.subscription.status === 'paused'
      ? 'orange-primary'
      : 'red-secondary'

const frequency = computed(() =>
  props.subscription.frequency === 'weekly' ? 'Semanal' : 'Quincenal',
)
const status = computed(() => subscriptionStatuses[props.subscription.status as keyof SubscriptionStatus])

const subscriptionStatuses: SubscriptionStatus = {
  active: 'Activa',
  paused: 'Pausada',
  cancelled: 'Cancelada',
  failed: 'Failed',
  waiting: 'Esperando...',
}
</script>
