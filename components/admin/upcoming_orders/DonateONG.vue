<template>
  <div class="text-[16px] leading-6 mt-5">
    <p class="font-bold">{{ $t(`${fragmentName}.title`) }}</p>
    <p>{{ $t(`${fragmentName}.description`) }}</p>
  </div>

  <Panel v-for="(ong, index) in ONGsData" class="mt-4">
    <div class="flex flex-row justi items-center">
      <NuxtImg
        class="w-[100px] h-[90px]"
        :src="`images/admin/upcoming-orders/ong-logos/${ong.image}`"
      />
      <div class="w-1/2">
        <p class="text-[18px] pl-4 font-bold leading-8">
          {{ $t(`${ong.fragment}.title`) }}
        </p>
      </div>
    </div>
    <div class="text-[14px] mt-3">
      <p>{{ $t(`${ong.fragment}.description`) }}</p>
      <div
        v-if="isCollapsed[index]"
        class="flex flex-row justify-center mt-3 w-1/2 mx-auto cursor-pointer"
        @click="toggleIsCollapsed(index)"
      >
        <Button
          :label="'Más info'"
          :pt="{ root: 'underline cursor-default' }"
        />
        <span class="mdi mdi-chevron-down text-[30px] ml-3"></span>
      </div>

      <div v-else>
        <p class="font-bold mt-3 mb-2">
          {{ $t(`${ong.fragment}.description_title`) }}
        </p>
        <span
          v-for="text in ong.description_sections"
          :class="text.includes('bold') ? 'font-bold' : ''"
        >
          {{ $t(`${ong.fragment}.${text}`) }}
        </span>
        <div class="overflow-hidden">
          <NuxtLink :to="$t(`${ong.fragment}.${ong.link}`)">
            <span class="underline">{{
              $t(`${ong.fragment}.${ong.link}`)
            }}</span>
          </NuxtLink>
        </div>
        <div
          v-if="!isCollapsed[index]"
          class="flex flex-row justify-center mt-3"
        >
          <span
            @click="toggleIsCollapsed(index)"
            class="mdi mdi-chevron-up text-[30px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
const isCollapsed = ref<Record<string, boolean>>({});

const toggleIsCollapsed = (index: number) => {
  if (index in isCollapsed.value) {
    isCollapsed.value[index] = !isCollapsed.value[index];
  } else {
    isCollapsed.value[index] = true;
  }
};

onMounted(() => {
  createHandleDisplayObject();
});

const createHandleDisplayObject = () => {
  ONGsData.forEach((ong, index) => {
    isCollapsed.value[index] = true;
  });
};

const fragmentName = "upcoming_orders.donate_to_ong";
const ONGsData = [
  {
    fragment: `${fragmentName}.ong_1`,
    description_sections: [
      "description_1",
      "description_2_bold",
      "description_3",
      "description_4_bold",
      "description_5",
      "description_6",
    ],
    image: "arrels.webp",
    link: "description_link",
  },
  {
    fragment: `${fragmentName}.ong_2`,
    description_sections: ["description_1", "description_2"],
    image: "segundas_oportunidades.webp",
    link: "description_link",
  },
  {
    fragment: `${fragmentName}.ong_3`,
    description_sections: ["description_1"],
    image: "mona.webp",
    link: "description_link",
  },
];
</script>
