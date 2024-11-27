<script setup lang="ts">
const { isMobile } = useScreenSize()
const activeProductImage = ref(0)
const setActiveProductImage = (index: number) => {
  activeProductImage.value = index
}
const handleSlideChange = (payload) => {
  activeProductImage.value = payload.currentSlideIndex
}
const inactiveTextStyle = (index: number) => (activeProductImage.value !== index ? 'text-grey-secondary' : '')
const images = [
  {
    image: '/images/boxes/sBox/SFR_1.webp',
    alt: 'boxes.s.alt',
  },
  {
    image: '/images/boxes/imBox/IMFR_1.webp',
    alt: 'boxes.m.alt',
  },
  {
    image: '/images/boxes/xlBox/XLFR_1.webp',
    alt: 'boxes.xl.alt',
  },
]
</script>

<template>
  <div
    class="bg-green-tertiary text-beige-primary font-solina-extended-book lg:flex lg:flex-row lg:items-center"
  >
    <div class="pt-6 pr-5 pb-6 pl-5 lg:w-1/2">
      <div class="lg:w-2/3 lg:mx-auto lg:text-[20px]">
        <SectionTitle
          :value="$t('companies.all-fruit')"
          class="text-lg text-green-primary mt-6"
          title-class="mb-6 text-[40px]"
        />

        <p class="leading-tight lg:my-10">
          {{ $t("companies.offer") }}
        </p>

        <div class="flex flex-col gap-y-4 mt-6 font-recoleta-medium lg:text-[26px]">
          <ListItem
            dot-class="text-[14px] lg:text-[20px]"
            :text-class="['cursor-pointer text-[18px]', inactiveTextStyle(0)]"
            :text="$t('companies.s')"
            @click="setActiveProductImage(0)"
          />
          <ListItem
            dot-class="text-[14px] lg:text-[20px]"
            :text-class="['cursor-pointer text-[18px]', inactiveTextStyle(1)]"
            :text="$t('companies.im')"
            @click="setActiveProductImage(1)"
          />
          <ListItem
            dot-class="text-[14px] lg:text-[20px]"
            :text-class="['cursor-pointer text-[18px]', inactiveTextStyle(2)]"
            :text="$t('companies.xl')"
            @click="setActiveProductImage(2)"
          />
        </div>
      </div>
    </div>

    <TKCarousel
      :data="images"
      :show-pagination="true"
      :show-navigation="!isMobile"
      :model-value="activeProductImage"
      class="flex-1"
      image-class="lg:w-[720px]"
      @slide-end="handleSlideChange"
    />
  </div>
</template>
