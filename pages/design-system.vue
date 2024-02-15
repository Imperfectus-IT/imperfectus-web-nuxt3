<script setup lang="ts"></script>

<template>
  <div class="container flex flex-col gap-4">
    <ButtonDemo />
    <ToolbarDemo />
    <!-- <CarouselDemo /> -->
    <CardDemo />
    <InputTextDemo />
    <DialogDemo />
    <PasswordDemo />
    <CheckboxDemo />
    <DropdownDemo />
    <MultiselectDemo />
    <ProgressBarDemo />
    <CarouselDemo :data="boxes" />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';



const boxes = ref<SlideObject[]>([
  {
    index: 5,
    image: "/images/landing/boxes-carousel/S.webp",
    name: "S-box",
  },
  {
    id: 6,
    image: "/images/landing/boxes-carousel/M.webp",
    name: "M-box",
  },
  {
    id: 7,
    image: "/images/landing/boxes-carousel/XL.webp",
    name: "XL-box",
  },
  {
    index: 5,
    image: "/images/landing/boxes-carousel/S.webp",
    name: "S-box",
  },
  {
    id: 6,
    image: "/images/landing/boxes-carousel/M.webp",
    name: "M-box",
  },
  {
    id: 7,
    image: "/images/landing/boxes-carousel/XL.webp",
    name: "XL-box",
  }
]);

</script>
