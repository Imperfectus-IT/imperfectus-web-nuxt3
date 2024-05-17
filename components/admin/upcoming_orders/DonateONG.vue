<template>
  <div class="text-[16px] leading-6 mt-5">
    <p class="font-bold">{{ $t(`${fragmentName}.title`) }}</p>
    <p>{{ $t(`${fragmentName}.description`) }}</p>
  </div>

  <Panel
    v-for="(ong, index) in ONGsData"
    :class="['mt-4 cursor-pointer lg:flex lg:flex-row lg:jus lg:w-3/4', getBackgroundColor(ong.name)]"
    :pt="!isMobile ? {
      content: 'flex flex-row'
    } : {}"
    @click="selectONG(ong.name)"
  >
    <div class="flex flex-row items-center lg:block mt-3">
      <NuxtImg
        :class="`w-[100px] h-[90px]`"
        :src="`images/admin/upcoming-orders/ong-logos/${ong.image}`"
      />
      <div v-if="isMobile" class="w-1/2">
        <p class="text-[18px] pl-4 font-bold leading-8">
          {{ $t(`${ong.fragment}.title`) }}
        </p>
      </div>
    </div>

    <div class="text-[14px] mt-3 lg:w-3/4 lg:text-[16px] lg:mx-auto">
      <p v-if=!isMobile class="text-[18px] font-bold leading-8">
        {{ $t(`${ong.fragment}.title`) }}
      </p>
      <p>{{ $t(`${ong.fragment}.description`) }}</p>
      <div
        v-if="isCollapsed[index]"
        class="flex flex-row justify-center mt-3 w-1/2 mx-auto cursor-pointer lg:mb-3"
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
  <div class="mt-4 flex flex-row gap-2">
    <Button
      class="h-7 px-6"
      v-if="selectedONG"
      @click="donateToONG"
      :label="$t(`${fragmentName}.donate_button`)"
    />
    <Button
      class="h-7 px-6"
      @click="closeForm"
      outlined
      :label="$t(`${fragmentName}.cancel_button`)"
    />
  </div>
</template>

<script setup lang="ts">


const { isMobile } = useScreenSize();
const imageWidth = computed(() => isMobile ? '100px' : '130px')
const imageHeight = computed(() => isMobile ? '90px' : '120px')

const selectedONG = ref<string>("");
const selectONG = (ong: string) => {
  selectedONG.value = ong;
};

const getBackgroundColor = (name: string) => {
  return selectedONG.value === name ? "bg-green-quaternary" : "";
};

const isCollapsed = ref<Record<string, boolean>>({});
const emit = defineEmits(["close-form", "donate-to-ong"]);
const closeForm = () => emit("close-form");
const donateToONG = () => emit("donate-to-ong", selectedONG.value);

const toggleIsCollapsed = (index: number) => {
  if (index in isCollapsed.value) {
    isCollapsed.value[index] = !isCollapsed.value[index];
  } else {
    isCollapsed.value[index] = true;
  }
};

const createHandleDisplayObject = () => {
  ONGsData.forEach((ong, index) => {
    isCollapsed.value[index] = true;
  });
};

onMounted(() => {
  createHandleDisplayObject();
});

const fragmentName = "upcoming_orders.donate_to_ong";
const ONGsData = [
  {
    name: "Arrels",
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
    name: "Segundas Oportunidades",
    fragment: `${fragmentName}.ong_2`,
    description_sections: ["description_1", "description_2"],
    image: "segundas_oportunidades.webp",
    link: "description_link",
  },
  {
    name: "Mona",
    fragment: `${fragmentName}.ong_3`,
    description_sections: ["description_1"],
    image: "mona.webp",
    link: "description_link",
  },
];
</script>
