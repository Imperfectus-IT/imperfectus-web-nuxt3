<template>
  <div class="card">
    <!-- DESKTOP VERSION -->
    <Timeline
      v-if="layoutType === 'desktop' || (!layoutType && isDesktop)"
      :value="timeLineValue()"
      class="hidden lg:block"
    >
      <template #marker="{ item }">
        <div
          :class="` flex self-baseline  h-6 w-6 rounded-full border-[1px] ${item.border} bg-${item.background} z-10`"
        >
          <span
            v-if="
              item.background === 'green-tertiary'
                || item.background === 'red-secondary'
            "
            :class="`mdi mdi-${item.icon} ${
              item.icon === 'check'
                ? 'text-green-primary'
                : 'text-white-primary'
            }  mx-auto my-auto`"
          />
        </div>
      </template>
      <template #content="{ item }">
        {{ item.status }}
      </template>
      <template #connector="{ index }">
        <div class="h-full absolute w-[1px] bg-grey-secondary" />
      </template>
    </Timeline>

    <!-- Full horizontal, only visible on desktop -->
    <Timeline
      v-if="layoutType === 'horizontal' && isDesktop"
      :value="timeLineValue()"
      layout="horizontal"
      class="timeline-horizontal"
    >
      <template #opposite="{ item }">
        <div class="text-center max-w-[100px] h-[50px] -translate-x-[40%] mb-[15px]">
          {{ item.status }}
        </div>
      </template>
      <template #marker="{ item }">
        <div
          :class="` flex self-baseline  h-6 w-6 rounded-full border-[1px] ${item.border} bg-${item.background} z-10`"
        >
          <span
            v-if="
              item.background === 'green-tertiary'
                || item.background === 'red-secondary'
            "
            :class="`mdi mdi-${item.icon} ${
              item.icon === 'check'
                ? 'text-green-primary'
                : 'text-white-primary'
            }  mx-auto my-auto`"
          />
        </div>
      </template>
      <template #connector="{ index }">
        <div class="w-full absolute h-[1px] bg-grey-secondary" />
      </template>
    </Timeline>

    <!-- MOBILE VERSION -->
    <Timeline
      v-if="layoutType === 'mobile' || !isDesktop"
      class="grid grid-cols-3 lg:hidden"
      :value="timeLineValue()"
      layout="horizontal"
    >
      <template #marker="{ item }">
        <div
          :class="`mx-auto flex self-baseline h-6 w-6 rounded-full border-[1px] ${item.border} bg-${item.background} z-10 lg:hidden`"
        >
          <span
            v-if="
              item.background === 'green-tertiary'
                || item.background === 'red-secondary'
            "
            :class="`mdi mdi-${item.icon} ${
              item.icon === 'check'
                ? 'text-green-primary'
                : 'text-white-primary'
            }  mx-auto my-auto text-[15px]`"
          />
        </div>
      </template>
      <template #content="{ item }">
        <div class="text-center">
          <span
            :class="
              item.background === 'beige-primary'
                ? 'text-grey-secondary'
                : 'text-green-tertiary'
            "
          >{{ item.status }}</span>
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
import type { PropType } from 'vue'
import { ref, computed } from 'vue'
import Timeline from 'primevue/timeline'
import type {
  OneStepEvents,
  StatusesObject,
  Event,
} from '../share/types/TimelineTypes'

// Define the valid values for layoutType
type LayoutType = 'desktop' | 'horizontal' | 'mobile' | null

const props = defineProps({
  orderStatus: {
    type: String,
    required: true,
  },
  layoutType: {
    type: String as PropType<LayoutType>,
    required: false,
    default: null,
  },
})

const isDesktop = ref(window.innerWidth >= 1024)

window.addEventListener('resize', () => {
  isDesktop.value = window.innerWidth >= 1024
})

const oneStepStatuses: string[] = [
  'replaced',
  'cancelled',
  'refunded',
  'other',
]

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
    border: 'border-green-tertiary',
  },
  refunded: {
    status: 'Pedido reembolsado',
    background: 'green-tertiary',
    icon: 'check',
    border: 'border-green-tertiary',
  },
  other: {
    status: 'Otro',
    background: 'red-secondary',
    icon: 'close',
    border: 'border-red-secondary',
  },
}

const events: Event[] = [
  {
    status: 'Pagado',
    background:
        activeStep.value === 0 || activeStep.value === 1
          ? 'red-secondary'
          : 'green-tertiary',
    icon: activeStep.value === 0 || activeStep.value === 1 ? 'close' : 'check',
    border: activeStep.value === 0 ? 'border-red-secondary' : 'border-green-tertiary',
  },
  {
    status: 'Pedido recibido',
    background: activeStep.value < 2 ? 'beige-primary' : 'green-tertiary',
    icon: 'check',
    border: activeStep.value < 2 ? 'border-grey-secondary' : 'border-green-tertiary',
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
    border: activeStep.value < 2 ? 'border-grey-secondary' : 'border-green-tertiary',
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
    border: activeStep.value < 3 ? 'border-grey-secondary' : 'border-green-tertiary',
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
    border: activeStep.value < 4 ? 'border-grey-secondary' : 'border-green-tertiary',
  },
  {
    status: 'Entregado',
    background: activeStep.value < 5 ? 'beige-primary' : 'green-tertiary',
    icon: 'check',
    border: activeStep.value < 5 ? 'border-grey-secondary' : 'border-green-tertiary',
  },
]
</script>

<style scoped lang="scss">
:deep .timeline-horizontal > div:last-child {
  max-width: 25px;
}
</style>
