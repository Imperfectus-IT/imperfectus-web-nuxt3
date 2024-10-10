<template>
  <div
    class="relative my-4 leading-10 bg-green-tertiary pb-10 mb-10
        lg:flex lg:flex-row lg:justify-between lg:px-4 lg:items-center lg:pr-28"
  >
    <h2 class="mx-7 font-recoleta-regular text-[35px] text-green-primary mt-10 mb-6 lg:text-[67px] lg:leading-tight lg:w-1/3 lg:pl-20 lg:py-20">
      {{ $t('homeTribe.title') }}
    </h2>

    <TKCarousel
      :carousel-class="'lg:w-1/3 lg:mt-6 lg:items-center'"
      :data="reviews"
      :show-navigation="isDesktop"
      :show-pagination="!isDesktop"
      :slide-class="'w-5/6 h-[400px] lg:w-full lg:mt-6  lg:h-[400px]'"
      :slot-class="'min-h-[200px]'"
      :autoplay="3000"
      :pagination-class="'absolute transform left-1/2 -translate-x-1/2 lg:-bottom-20 text-red-primary'"
      :navigation-next-class="'absolute -bottom-32 !bg-green-primary text-green-tertiary'"
      :navigation-prev-class="'absolute -bottom-32 left-[24vw] !bg-green-primary text-green-tertiary'"
    >
      <template #SlideContent="{ item }">
        <div
          class=" bg-beige-primary h-[260px] rounded-lg leading-6 text-left pl-2 mb-3 lg:p-3 lg:h-[280px] overflow-auto"
        >
          <div class=" w-full bg-beige-primary flex flex-row items-center">
            <Rating
              class="py-2 "
              :model-value="item.rating"
              :cancel="false"
            />
            <span class="mdi mdi-check-decagram text-lg ml-4 text-blue-primary" />
            <NuxtImg
              src="/images/logos/landing/google-mini.webp"
              class="w-5 h-5 ml-auto mr-4"
              loading="lazy"
              format="webp"
            />
          </div>

          <p>
            {{ item.text }}
          </p>
        </div>
        <div class="flex flex-row">
          <NuxtImg
            :src="item.imageUrl"
            :alt="item.author"
            class="rounded-full w-20 h-20 lg:h-24 lg:w-24"
            loading="lazy"
            format="webp"
          />
          <div class="flex flex-col leading-6 justify-center ml-3">
            <p class="text-left text-green-primary">
              {{ item.author }}
            </p>
            <p class="text-left text-white-primary">
              {{ item.relativeTime }}
            </p>
          </div>
        </div>
      </template>
    </TKCarousel>
  </div>
</template>

<script setup lang="ts">
const { reviews } = usePublicReviewsState()
const { isDesktop } = useScreenSize()
</script>
