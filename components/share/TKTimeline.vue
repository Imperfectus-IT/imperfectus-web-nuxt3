<template>
  <div class="card">
    <!-- DESKTOP VERSION -->
    <Timeline
      :value="timeLineValue()"
      class="hidden lg:block"
    >
      <template #marker="{ item }">
        <div
          :class="` flex self-baseline  h-6 w-6 rounded-full border-[1px] border-${item.background !== 'green-primary' ? item.background : 'green-tertiary'} bg-${item.background} z-10`"
        >
          <span
            v-if="
              item.background === 'green-tertiary'
                || item.background === 'red-secondary'
            "
            :class="`mdi mdi-${item.icon} ${item.icon === 'check' ? 'text-green-primary' : 'text-white-primary'}  mx-auto my-auto`"
          />
        </div>
      </template>
      <template #content="{ item }">
        {{ item.status }}
      </template>
    </Timeline>

    <!-- MOBILE VERSION -->
    <Timeline
      class="grid grid-cols-3"
      :value="timeLineValue()"
      layout="horizontal"
    >
      <template #marker="{ item }">
        <div
          :class="`mx-auto flex self-baseline h-6 w-6 rounded-full border-[1px] border-${item.background !== 'green-primary' ? item.background : 'green-tertiary'} bg-${item.background} z-10 lg:hidden`"
        >
          <span
            v-if="
              item.background === 'green-tertiary'
                || item.background === 'red-secondary'
            "
            :class="`mdi mdi-${item.icon} ${item.icon === 'check' ? 'text-green-primary' : 'text-white-primary'}  mx-auto my-auto text-[15px]`"
          />
        </div>
      </template>
      <template #content="{ item }">
        <div class="text-center ">
          <span :class="item.background === 'beige-primary' ? 'text-grey-secondary' : 'text-green-tertiary'">{{ item.status }}</span>
        </div>
      </template>
      <template #connector="{ index }">
        <div
          :class="
            index !== 2
              ? `absolute left-1/2 h-[1px] w-full bg-green-tertiary`
              : ''
          "
        />
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import Timeline from 'primevue/timeline'
import type { OneStepEvents, StatusesObject, Event } from '../share/types/TimelineTypes'

const props = defineProps({
  orderStatus: {
    type: String,
    required: true,
  },
})

const oneStepStatuses: string[] = ['replaced', 'cancelled', 'refunded', 'other']

const orderStatuses: StatusesObject = {
  0: 'pending',
  1: 'failed',
  2: 'processing',
  3: 'label_created',
  4: 'on_shipment',
  5: 'completed',
}

const timeLineValue = () => {
  if (oneStepStatuses.includes(props.orderStatus)) {
    return [oneStepEvents[props.orderStatus as keyof OneStepEvents]]
  }
  else {
    return events
  }
}

const activeStep = computed(() => {
  return Object.keys(orderStatuses).findIndex(
    (key: string) => orderStatuses[parseInt(key)] === props.orderStatus,
  )
})

const oneStepEvents: OneStepEvents = {
  replaced: {
    status: 'Pedido reemplazado',
    background: 'green-tertiary',
    icon: 'check',
  },
  refunded: {
    status: 'Pedido reembolsado',
    background: 'green-tertiary',
    icon: 'check',
  },
  other: {
    status: 'Otro',
    background: 'red-secondary',
    icon: 'close',
  },
}

const events: Event[] = [
  {
    status: 'Pagado',
    background: activeStep.value === 0 || activeStep.value === 1 ? 'red-secondary' : 'green-tertiary',
    icon: activeStep.value === 0 || activeStep.value === 1 ? 'close' : 'check',
  },
  {
    status: 'Pedido recibido',
    background:
      activeStep.value < 2 ? 'beige-primary' : 'green-tertiary',
    icon: 'check',
  },
  {
    status: 'Período de modificación',
    background:
      activeStep.value < 2
        ? 'beige-primary'
        : activeStep.value === 2
          ? 'green-primary'
          : 'green-tertiary',
    icon: 'check',
  },
  {
    status: 'Preparando envío',
    background:
      activeStep.value < 3
        ? 'beige-primary'
        : activeStep.value === 3
          ? 'green-primary'
          : 'green-tertiary',
    icon: 'check',
  },
  {
    status: 'En reparto',
    background:
      activeStep.value < 4
        ? 'beige-primary'
        : activeStep.value === 4
          ? 'green-primary'
          : 'green-tertiary',
    icon: 'check',
  },
  {
    status: 'Entregado',
    background: activeStep.value < 5 ? 'beige-primary' : 'green-tertiary',
    icon: 'check',
  },
]
</script>
