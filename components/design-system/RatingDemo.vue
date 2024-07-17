<template>
  <div class="flex flex-wrap justify-center">
    <div class="flex flex-col items-center">
      <h3 class="text-lg">
        Basic Rating
      </h3>
      <Rating v-model="value" />
    </div>
    <div class="flex flex-col items-center">
      <h3 class="text-lg">
        Basic Rating without cancel
      </h3>
      <Rating
        v-model="value"
        :cancel="false"
      />
    </div>
    <div class="ml-10">
      <h4 class="text-[22px]">
        Review rating
      </h4>
      <Rating
        v-model="value"
        :cancel="false"
      >
        <template #onicon>
          <NuxtImg
            :src="'images/admin/order-reviews/rating-green.webp'"
            class="w-[140px]"
          />
        </template>
        <template #officon>
          <NuxtImg
            :src="'images/admin/order-reviews/rating.webp'"
            class="w-[140px]"
          />
        </template>
      </Rating>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(null)
</script>
