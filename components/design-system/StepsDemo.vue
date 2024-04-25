<template>
  <div class="card w-10/12 mx-auto">
    <Steps
      :model="items"
      :active-step="activeStep"
    >
      <template #item="{ item, index }">
        <div
          :class="`flex flex-col justify-center flex1 w-[100vw] h-[50px] overflow-hidden ${ true ? `before:border-t before:border-green-tertiary before:dark:border-surface-700 before:w-full before:absolute before:top-1/2 ${index === 0 ? 'before:left-1/2' : index === items.length - 1 ? 'before:-left-1/2' : '' } before:transform before:-mt-3` : '' }`"
        >
          <span
            :class="`w-[28px] h-[28px] border-[1px] p-1.5 rounded-full bg-${getBgColor(index)} z-50 relative left-1/2 -translate-x-1/2`"
          >
            <NuxtImg
              v-if="index < activeStep"
              width="15"
              height="auto"
              :src="item.icon"
            />
          </span>
          <p class="text-center top-4 z-50">{{ item.label }}</p>
        </div>
      </template>
    </Steps>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const getBgColor = (index: number) => {
  return activeStep.value > index
    ? "green-tertiary"
    : activeStep.value < index
      ? "beige-primary"
      : "green-primary";
};

const activeStep = computed(() => 1);

const items = ref([
  {
    label: "Personal Info",
    icon: "icons/steps/check.webp",
  },
  {
    label: "Reservation",
    icon: "icons/steps/check.webp",
  },
  {
    label: "Review",
    icon: "icons/steps/check.webp",
  },
]);
</script>

