<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div>
    <p class="font-recoleta-medium text-[20px] mb-5">
      {{ t('pages.order.status.paymentData') }}
    </p>

    <p class="font-solina-extended-book font-bold text-[16px]">
      {{ t('pages.order.status.total') }}
    </p>
    <p class="font-solina-extended-book text-[16px] mt-2 mb-5">
      {{ props.total }} €
    </p>
  </div>
</template>

<style scoped lang="scss">

</style>
