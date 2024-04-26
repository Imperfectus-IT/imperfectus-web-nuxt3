<template>
  <div class="card border-[1px] border-green-tertiary p-3 rounded-lg relative">
    <h4>TIMELINE</h4>
    <!-- DESKTOP VERSION -->
    <Timeline :value="timeLineValue()">
      <template #marker="slotProps">
        <div
          :class="`mx-auto flex self-baseline h-7 w-7 rounded-full border-[1px] border-green-tertiary bg-${slotProps.item.background} z-10`"
        >
          <NuxtImg
            v-if="slotProps.item.background === 'green-tertiary'"
            format="webp"
            class="w-[14px] h-[12px] mx-auto my-auto"
            src="icons/steps/check.webp"
          />
        </div>
      </template>
      <template #content="slotProps">
        {{ slotProps.item.status }}
      </template>
    </Timeline>

    <!-- MOBILE VERSION -->
    <Timeline
      class="grid grid-cols-3 relative left-[]"
      :value="timeLineValue()"
      layout="horizontal"
    >
      <template #marker="slotProps">
        <div
          :class="`mx-auto flex self-baseline h-7 w-7 rounded-full border-[1px] border-green-tertiary bg-${slotProps.item.background} z-10`"
        >
          <NuxtImg
            v-if="
              slotProps.item.background === 'green-tertiary' ||
              slotProps.item.background === 'red-primary'
            "
            format="webp"
            class="w-[14px] h-[12px] mx-auto my-auto object-cover"
            :src="slotProps.item.icon"
          />
        </div>
      </template>
      <template #content="slotProps">
        <div class="text-center">
          {{ slotProps.item.status }}
        </div>
      </template>
      <template #connector="slotProps">
        <div
          :class="
            slotProps.index !== 2
              ? `absolute left-1/2 h-[1px] w-full bg-green-tertiary`
              : ''
          "
        ></div>
      </template>
    </Timeline>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Timeline from "primevue/timeline";

const order = {
  status: "failed",
};

const oneStepStatuses = ["replaced", "cancelled", "refunded", "other"];

const orderStatuses = {
  0: "pending",
  1: "failed",
  2: "processing",
  3: "label_created",
  4: "on_shipment",
  5: "completed",
};

const timeLineValue = () => {
  if (oneStepStatuses.includes(order.status)) {
    return [oneStepEvents[order.status]];
  } else {
    return events;
  }
};

const activeStep = computed(() => {
  return Object.keys(orderStatuses).findIndex(
    (key) => orderStatuses[key] === order.status
  );
});




const oneStepEvents = {
  replaced: {
    status: "Pedido reemplazado",
    background: "green-tertiary",
    icon: "icons/steps/check.webp",
  },
  cancelled: {
    status: "Pedido cancelado",
    background: "red-primary",
    icon: "icons/steps/cross.webp",
  },
  refunded: {
    status: "Pedido reembolsado",
    background: "green-tertiary",
    icon: "icons/steps/check.webp",
  },
  other: {
    status: "Otro",
    background: "red-primary",
    icon: "icons/steps/cross.webp",
  },
};

const events = [
  {
    status: "Pedido creado",
    background: activeStep.value === 0 ? "green-primary" : "green-tertiary",
    icon: "icons/steps/check.webp",
  },
  {
    status: "Pedido pagado",
    background:
      activeStep.value < 1
        ? "beige-primary"
        : activeStep.value === 1
          ? "red-primary"
          : "green-tertiary",
    icon: "icons/steps/cross.webp",
  },
  {
    status: "Período de modificación",
    background:
      activeStep.value < 2
        ? "beige-primary"
        : activeStep.value === 2
          ? "green-primary"
          : "green-tertiary",
    icon: "icons/steps/check.webp",
  },
  {
    status: "Preparando envío",
    background:
      activeStep.value < 3
        ? "beige-primary"
        : activeStep.value === 3
          ? "green-primary"
          : "green-tertiary",
    icon: "icons/steps/check.webp",
  },
  {
    status: "En reparto",
    background:
      activeStep.value < 4
        ? "beige-primary"
        : activeStep.value === 4
          ? "green-primary"
          : "green-tertiary",
    icon: "icons/steps/check.webp",
  },
  {
    status: "Entregado",
    background: activeStep.value < 5 ? "beige-primary" : "green-tertiary",
    icon: "icons/steps/check.webp",
  },
]
</script>
