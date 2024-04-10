<template>
  <div class="lg:grid lg:grid-cols-3 lg:grid-rows-[auto] lg:mt-6">
    <p class="text-[26px] px-4 leading-9 my-12 lg:col-start-2 lg:col-span-2 lg:h-[200px] h-[300px] lg:w-7/12 lg:mb-0 lg:text-[30px] lg:leading-snug lg:mt-20">
      {{ $t('homeProducts.description') }}
    </p>
    <BirdWomanPhoto />
    <ProductListSelector class="lg:mt-20" @toggle="handleToggleType" />
    <ProductsCarousel 
    class="mt-4"  
    :display-desktop="displayDesktop" 
    :items-type="classItemsToShow" 
    />
  </div>
</template>

<script setup lang="ts">
 defineProps({
  displayDesktop: {
    type: Boolean,
    default: false
  },
  }
 )

const classItemsToShow = ref('fruits')

const handleToggleType = (type: string) => {
  classItemsToShow.value = type
}

</script>