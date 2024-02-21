<template>
  <TKCarousel
    :slide-class="'w-full ml-4'"
    :image-class="'rounded-t-[20px] w-full h-[30vh] object-cover'"
    :data="boxes"
    :show-navigation="false"
    :show-pagination="false"
    :items-to-show="1.2"
    :wrap-around="false"
  >
    <template #SlideContent="{ item }">
      <hr>
      <div class="h-[100px]">
        <p class=" text-left ml-2 mt-2 text-[20px]">
          {{ item.title }}
        </p>
        <p class="ml-2 mt-2 text-left text-[14px]">
          {{ item.description }}
        </p>
      </div>
      <Button
        class="w-full rounded-t-[0px] rounded-b-[20px] mt-auto"
        :label="$t('homeBoxes.buy')"
        severity="secondary"
      />
    </template>
  </TKCarousel>
</template>

<script setup lang="ts">
import type { CarouselSlideObject } from '~/components/talkual-ui/TKCarousel/TKCarouselTypes';

import { useI18n } from 'vue-i18n'
const { t } = useI18n();

defineProps({
  boxes: {
    type: Array as () => CarouselSlideObject[],
    required: true
  }
});


</script>