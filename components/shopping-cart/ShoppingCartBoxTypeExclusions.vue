<script setup lang="ts">
import type { Product } from '~/composables/shared/product/types/Product.ts'

const props = defineProps<{
  productExclusions: Partial<Product[]>
}>()
const { t } = useI18n()
const isExclusionSelected = ref(false)
const selectedProductExclusions = ref<Partial<Product[]>>([])
const searchExclusion = ref('')
const filteredExclusions = computed(() => {
  if (!searchExclusion.value) {
    return props.productExclusions
  }
  return props.productExclusions.filter((product) => {
    return product.name.toLowerCase().includes(searchExclusion.value.toLowerCase())
  })
})
const productExclusionsResume = computed(() => {
  return t('admin.order.exclusions.limit', { 'current_exclusions': selectedProductExclusions.value.length, 'max_exclusions': 6 })
})
</script>

<template>
  <div class="flex flex-col items-center gap-5 mt-8">
    <p class="font-recoleta-regular text-lg">
      {{ $t('order.steps.stepCustomize.section4') }}
    </p>
    <div class="flex items-center gap-5">
      <Button
        class="text-xl"
        :label="$t('order.steps.stepCustomize.section4.yes-btn')"
        outlined
        @click.prevent="isExclusionSelected = true"
      />
      <Button
        :class="['text-xl', !isExclusionSelected ? 'bg-green-primary' : 'bg-transparent']"
        :label="$t('order.steps.stepCustomize.section4.no-btn')"
        outlined
        active
        @click.prevent="isExclusionSelected = false"
      />
    </div>
    <span class="font-solina-extended-book text-base leading-6">
      <strong>{{ $t('order.steps.stepCustomize.exclusions.bold', { max: 6 }) }}</strong>
      {{ $t('order.steps.stepCustomize.exclusions') }}
    </span>
    <div v-if="isExclusionSelected" class="w-full">
      <IconField icon-position="left">
        <InputIcon>
          <i class="mdi mdi-magnify text-lg" />
        </InputIcon>
        <InputText
          v-model="searchExclusion"
          class="w-full rounded-xl"
          :placeholder="$t('order.steps.stepCustomize.section4.search')"
        />
      </IconField>
      <p class="my-4">
        {{ productExclusionsResume }}
      </p>
      <VirtualScroller scrollHeight="300px" :items="filteredExclusions" :itemSize="filteredExclusions.length * 4" :autoSize="true">
        <template v-slot:item="{ item }">
          <div
              class="py-3"
          >
            <Checkbox
                v-model="selectedProductExclusions"
                class="mr-3"
                :input-id="item.id"
                name="productExclusion"
                :value="item"
            />
            <label
                class="font-solina-extended-book tex-base"
                :for="item?.name"
            >{{ item?.name }}</label>
          </div>
        </template>
      </VirtualScroller>
    </div>
  </div>
</template>
