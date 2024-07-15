<template>
  <h4 class="font-bold text-[18px] mt-7 -mb-3">
    {{ $t('orders.order.review.title') }}
  </h4>
  <Divider class="!w-3/4" />
  <div
    v-for="(item, index) in textData.rating_titles"
    :key="item"
    class="mt-5 flex flex-row"
  >
    <div class="flex flex-col">
      <h4 class="mb-2 font-bold text-[14px]">
        {{ getRatingTitle(index) }}
      </h4>
      <div class="flex flex-row">
        <Rating
          v-model="newRatings[getReviewObjectKey(index)]"
          :cancel="false"
          :readonly="isReviewed"
        >
          <template #onicon>
            <NuxtImg
              :src="'images/admin/order-reviews/rating-green.webp'"
              class="w-[55px] lg:w-[65px] -mr-5 lg:mr-2"
            />
          </template>
          <template #officon>
            <NuxtImg
              :src="'images/admin/order-reviews/rating.webp'"
              class="w-[55px] lg:w-[65px] -mr-5 lg:mr-2"
            />
          </template>
        </Rating>
        <p class="my-auto text-center ml-3">
          {{ getTextValue(index) }}
        </p>
      </div>
    </div>
  </div>
  <Button
    v-if="!isReviewed"
    outlined
    class="w-full lg:w-1/3 mt-8 "
    :label="$t(`${textData.section}button`)"
    @click="handleCreateRating"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ReviewRatings } from '~/components/admin/my-orders/partials/types/ReviewRatings.ts'

const { t: $t } = useI18n()

const emits = defineEmits(['createReview'])
const newRatings: ReviewRatings = reactive({
  productQuality: 3,
  deliveryService: 3,
  overallExperience: 3,
})

const handleCreateRating = () => {
  emits('createReview', { newRatings, orderItemId: props.orderItemId })
}

const props = defineProps<{
  review: {
    productQuality: number
    deliveryService: number
    overallExperience: number
  } | null
  orderItemId: number
}>()

const isReviewed = ref(false)

watchEffect(() => {
  if (props.review) {
    newRatings.productQuality = props.review.productQuality
    newRatings.deliveryService = props.review.deliveryService
    newRatings.overallExperience = props.review.overallExperience
    isReviewed.value = true
  }
})

const textData = {
  section: 'orders.order.review.',
  rating_titles: Array.from({ length: 3 }, (_, i) =>
    $t(`orders.order.review.item_${i}.title`),
  ),
  textValues: Array.from({ length: 5 }, (_, i) =>
    $t(`orders.order.review.values.option_${i}`),
  ),
}

const getTextValue = (index: number) => {
  const key = getReviewObjectKey(index)
  const reviewValue = newRatings[key]
  return textData.textValues[reviewValue - 1]
}

const getRatingTitle = (index: number) => {
  return $t(`${textData.section}item_${index}.title`)
}

const getReviewObjectKey = (index: number) => {
  return $t(`${textData.section}item_${index}.value`) as keyof ReviewRatings
}
</script>
