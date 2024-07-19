<script setup lang="ts">
const emit = defineEmits(['goToStep'])
const goToNextStep = () => {
  const user = useStrapiUser()
  user?.value?.id ? emit('goToStep', SHIPPING_STEP) : emit('goToStep', AUTH_STEP)
}

const goBack = () => {
  emit('goToStep', CUSTOMIZE_STEP)
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[25%] 2xl:px-[20%] relative">
    <ShoppingCartSummaryBox
      :back-button="true"
      @go-back="goBack"
    />
    <div class="flex justify-center">
      <Button
        :label="$t('order.next')"
        severity="secondary"
        class="mt-4"
        @click.prevent="goToNextStep"
      />
    </div>
  </div>
</template>
