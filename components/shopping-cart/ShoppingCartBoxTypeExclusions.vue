<script setup lang="ts">
import { useGetLocaleLanguage } from '~/composables/shared/useGetLocaleLanguage.ts'

const props = defineProps<{
  productExclusions: ItemProduct[]
}>()
const { shoppingCart } = useShoppingCartState()
const { t, locale } = useI18n()
const { getLocaleName } = useGetLocaleLanguage(locale)
const isExclusionSelected = ref(false)
const searchExclusion = ref('')
const filteredExclusions = computed(() => {
  if (!searchExclusion.value) {
    return props.productExclusions
  }
  return props.productExclusions.filter((product) => {
    return product[`name${getLocaleName.value}`].toLowerCase().includes(searchExclusion.value.toLowerCase())
  })
})
const MAX_MIXED_EXCLUSIONS = 6
const MAX_FRUIT_OR_VEGETABLE_EXCLUSIONS = 3
const maxLimitExclusions = computed(() => {
  return shoppingCart.value.currentItem.boxType === MIXED_BOX_TYPE ? MAX_MIXED_EXCLUSIONS : MAX_FRUIT_OR_VEGETABLE_EXCLUSIONS
})

const productExclusionsResume = computed(() => {
  return t('admin.order.exclusions.limit', { current_exclusions: shoppingCart.value.currentItem.exclusions.length, max_exclusions: maxLimitExclusions.value })
})

const disabledExclusion = (product: ProductExclusion) => {
  const exclusionIds = shoppingCart.value.currentItem?.exclusions?.map(exclusion => exclusion.id)
  return shoppingCart.value.currentItem.exclusions.length === maxLimitExclusions.value
    && !exclusionIds.includes(product.id)
}
const onClickSelectExclusion = (isSelected: boolean) => {
  isExclusionSelected.value = isSelected
  if (!isSelected) {
    shoppingCart.value.currentItem.exclusions = []
  }
}

const initData = () => {
  isExclusionSelected.value = shoppingCart.value.currentItem.exclusions.length > 0
}

onMounted(() => {
  initData()
})
</script>

<template>
  <div class="flex flex-col items-center gap-5 mt-8">
    <p class="font-recoleta-regular text-lg">
      {{ $t('order.steps.stepCustomize.section4') }}
    </p>
    <div class="flex items-center gap-5">
      <Button
        :class="['text-xl', isExclusionSelected ? 'bg-green-primary' : 'bg-transparent']"
        :label="$t('order.steps.stepCustomize.section4.yes-btn')"
        outlined
        @click.prevent="onClickSelectExclusion(true)"
      />
      <Button
        :class="['text-xl', !isExclusionSelected ? 'bg-green-primary' : 'bg-transparent']"
        :label="$t('order.steps.stepCustomize.section4.no-btn')"
        outlined
        active
        @click.prevent="onClickSelectExclusion(false)"
      />
    </div>
    <span class="font-solina-extended-book text-base leading-6">
      <strong>{{ $t('order.steps.stepCustomize.exclusions.bold', { max: 6 }) }}</strong>
      {{ $t('order.steps.stepCustomize.exclusions') }}
    </span>
    <div
      v-if="isExclusionSelected"
      class="w-full"
    >
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
      <VirtualScroller
        scroll-height="300px"
        :items="filteredExclusions"
        :item-size="50"
        :auto-size="true"
      >
        <template #item="{ item }">
          <div
            class="py-3"
          >
            <Checkbox
              v-model="shoppingCart.currentItem.exclusions"
              class="mr-3"
              :input-id="String(item.id)"
              name="productExclusion"
              :disabled="disabledExclusion(item)"
              :value="item.id"
            />
            <label
              class="font-solina-extended-book tex-base"
              :for="item?.name"
            >{{ item['name' + getLocaleName] }}</label>
          </div>
        </template>
      </VirtualScroller>
    </div>
  </div>
</template>
