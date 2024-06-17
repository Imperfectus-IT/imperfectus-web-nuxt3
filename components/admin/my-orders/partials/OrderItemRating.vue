<template>
  <div v-for="(item, index) in textData.rating_titles" :key="item" class="mt-5 flex flex-row">
    <div class="flex flex-col">
      <h4 class="mb-2">{{ getRatingTitle(index) }}</h4>
      <div class="flex flex-row">
        <Rating v-model="review[getReviewObjectKey(index)]" :cancel="false" :readonly="isReviewed">
          <template #onicon>
            <NuxtImg :src="'images/admin/order-reviews/rating-green.webp'" class="w-[70px]"/>
          </template>
          <template #officon>
            <NuxtImg :src="'images/admin/order-reviews/rating.webp'" class="w-[70px]"/>
          </template>
        </Rating>
        <p class="my-auto ml-4">{{ getTextValue(index) }}</p>
      </div>
    </div>
  </div>
  <Button v-if="!isReviewed" class="w-1/4 mt-4" label="Guardar valoracion"/>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t: $t} = useI18n()

const props = defineProps<{
  ratings: {
    productQuality: number
    deliveryService: number
    overallExperience: number
  } | null
}>();

const isReviewed = ref(false);

const review = reactive({
  productQuality: 3,
  deliveryService: 3,
  overallExperience: 3
})

watchEffect(() => {
  if (props.ratings) {
    review.productQuality = props.ratings.rating.productQuality
    review.deliveryService = props.ratings.rating.deliveryService
    review.overallExperience = props.ratings.rating.overallExperience
    isReviewed.value = true
  }
})

const textData = {
  section: 'orders.order.rating.',
  rating_titles: Array.from({length: 3}, (_, i) => $t(`orders.order.rating.item_${i}.title`)),
  textValues: Array.from({length: 5}, (_, i) => $t(`orders.order.rating.values.option_${i}`))
}

const getTextValue = (index) => {
  const key = getReviewObjectKey(index);
  const reviewValue = review[key];
  return textData.textValues[reviewValue - 1];
}

const getRatingTitle = (index) => {
  return $t(`${textData.section}item_${index}.title`)
}

const getReviewObjectKey = (index) => {

  return $t(`${textData.section}item_${index}.value`)
}


</script>
