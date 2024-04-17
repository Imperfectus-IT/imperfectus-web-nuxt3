<template>
  <div class="mb-12 lg:flex lg:flex-row lg:gap-x-8 lg:mx-10">
    <TKCarousel
      :class="`lg:w-3/4 lg:order-${carouselOrder}`"
      slide-class="lg:w-full"
      image-class="rounded-t-[20px] lg:h-[auto] lg:w-[900px] lg:rounded-[20px] object-fit"
      :data="carouselData"
      :show-navigation="displayDesktop"
    />
    <OurBoxesCards
      :class="`lg:w-1/3 order-${cardOrder} `"
      :data="cardData"
      :selected-box="selectedBox"
      :box-options="boxOptions"
      @update-item-on-parent="updateItemOnParent"
    />
  </div>
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from "../talkual-ui/TKCarousel/TKCarouselTypes";
import type { SelectedBox } from "./types/BoxSelected";

defineProps({
  carouselData: {
    type: Array as PropType<CarouselSlideObject[]>,
    required: true,
  },
  cardData: {
    type: Object as PropType<{ title: string, description: string, price: string }>,
    required: true,
  },
  selectedBox: {
    type: Object as PropType<SelectedBox>,
    required: true,
  },
  cardOrder: {
    type: String,
    required: true,
  },
  carouselOrder: {
    type: String,
    required: true,
  },
  boxOptions: {
    type: Array as PropType<{ name: string; value: string }[]>,
    default: () => [],
  }
});

const { addResize, removeResize, windowWidth} = useWindowSize();
onMounted(() => {
  addResize();
});

onBeforeUnmount(() => {
  removeResize();
});

const displayDesktop = computed(() => windowWidth.value > 768);

const emit = defineEmits(["update-item-on-parent"]);

const updateItemOnParent = (payload: SelectedBox) => {
  emit("update-item-on-parent", payload);
};
</script>

