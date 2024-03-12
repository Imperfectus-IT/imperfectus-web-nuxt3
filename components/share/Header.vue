<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderDefault
    class="overflow-hidden bg-center relative bg-cover flex items-center justify-center lg:h-[500px] before:content-[''] before:block before:bg-black before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[rgba(0,0,0,.3)]"
    :style="{
      backgroundImage: `url(${background})`,
      backgroundColor: backgroundColor,
      borderRadius: round ? '25px' : '0',
      margin: !full ? '30px' : '',
      borderWidth: border ? '3px' : '0',
      borderStyle: border ? 'solid' : '',
    }"
  >
    <Container
      class="relative flex flex-col items-center text-center content"
    >
      <h1
        class="mt-3 text-white-primary font-recoleta-regular font-[500] text-[40px] leading-[1.25] lg:text-[100px] whitespace-break-spaces"
        :class="titleClass"
        >
        {{ title }}
      </h1>

      <h2
        v-if="descriptionIsH2"
        class="text-white-primary Header__description text-[18px] font-solina-extended-book lg:text-[30px]"
        :class="descriptionClass"
        >
        {{ description }}
      </h2>

      <p
        v-else
        class="text-white-primary Header__description text-[18px] font-solina-extended-book lg:text-[30px]"
        :class="descriptionClass"

        >
        {{ description }}
      </p>

      <slot name="action"></slot>
    </Container>
  </HeaderDefault>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  backgroundColor: {
    type: String,
    required: false,
    default: "",
  },
  backgroundDesktop: {
    type: String,
    required: true,
  },
  backgroundMobile: {
    type: String,
    required: false,
    default: null,
  },
  round: {
    type: Boolean,
    required: false,
    default: false,
  },
  full: {
    type: Boolean,
    default: true,
  },
  border: {
    type: Boolean,
    default: false,
  },
  descriptionIsH2: {
    type: Boolean,
    default: false,
  },
  titleClass: {
    type: String,
    default: "",
  },
  descriptionClass: {
    type: String,
    default: "",
  },
});

const windowWidth = ref(null);

const background = computed(() => {
  if (props.backgroundMobile && windowWidth.value < 960) {
    return props.backgroundMobile;
  }
  return props.backgroundDesktop;
});

onMounted(() => {
  window.addEventListener("resize", updateWidth);
  updateWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWidth);
});

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
</script>
