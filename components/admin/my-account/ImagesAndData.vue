<template>
  <div
    class="font-solina-extended-book lg:flex lg:flex-row lg:justify-center lg:gap-20"
  >
    <div class="flex flex-row lg:flex-col">
      <NuxtImg
        :key="imageWidth"
        src="images/admin/my-account/mi-cuenta-1.webp"
        alt="mi-cuenta-1"
        format="webp"
        loading="lazy"
        :width="imageWidth"
        :height="imageHeight"
      />
      <div class="flex flex-col w-1/2 lg:w-full">
        <p
          class="p-3 pb-0 mb-0 text-[18px] font-recoleta-medium text-center my-auto lg:w-full lg:text-[22px]"
        >
          {{ $t("profile.my_account.info_1") }}
        </p>
        <p
          class="p-3 pt-0 text-[18px] mt-0 font-recoleta-medium text-center my-auto lg:w-full lg:text-[30px]"
        >
          1.5000.000 Kgs
        </p>
      </div>
    </div>

    <div class="flex flex-row lg:flex-col mt-10 lg:mt-0">
      <NuxtImg
        :key="imageWidth"
        src="images/admin/my-account/mi-cuenta-2.webp"
        alt="mi-cuenta-1"
        format="webp"
        loading="lazy"
        :width="imageWidth"
        :height="imageHeight"
      />
      <!-- TODO User Kgs must be calculated! -->
      <div class="flex flex-col w-1/2 lg:w-full">
        <p
          class="p-3 pb-0 mb-0 text-[18px] font-recoleta-medium text-center my-auto lg:w-full lg:text-[22px]"
        >
          {{ $t("profile.my_account.info_2") }}
        </p>
        <p
          class="p-3 pt-0 text-[18px] mt-0 font-recoleta-medium text-center my-auto lg:w-full lg:text-[30px]"
        >
          {{kgs}} Kgs 
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineProps<{
  kgs: string;
}>();

const { addResize, removeResize, windowWidth } = useWindowSize();

const imageWidth = computed(() => (windowWidth.value > 1024 ? '425': 150));
const imageHeight = computed(() => (windowWidth.value > 1024 ? '440' : 150));

onMounted(() => {
  addResize();
});

onBeforeUnmount(() => {
  removeResize();
});
</script>
