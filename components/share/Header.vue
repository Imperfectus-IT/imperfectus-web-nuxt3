<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderDefault
    class="h-[350px] overflow-hidden bg-center relative bg-cover flex items-center justify-center lg:h-[500px] before:content-[''] before:block before:bg-black before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[rgba(0,0,0,.3)]"
    :style="{
      backgroundImage: `url(${background})`,
      backgroundColor: backgroundColor,
      borderRadius: round ? '25px' : '0',
      margin: !full ? '30px' : '',
      borderWidth: border ? '3px' : '0',
      borderStyle: border ? 'solid' : ''
    }"
  >
    <Container
      class="content text-center flex flex-col items-center relative z-10"
    >
      <h1 class="text-white font-recoleta-regular font-[500] text-[40px] leading-[1.125]  lg:text-[100px]">
        {{ title }}
      </h1>

      <h2
        v-if="descriptionIsH2"
        class="Header__description text-white text-[18px] font-solina-extended-book lg:text-[30px]"
      >
        {{ description }}
      </h2>

      <p
        v-else
        class="Header__description text-white text-[18px] font-solina-extended-book lg:text-[30px]"
      >
        {{ description }}
      </p>
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
