<script setup lang="ts">
import type {Product} from "~/composables/shared/product/types/Product.ts";
defineProps<{
  productExclusions: Partial<Product[]>;
}>();
const isExclusionSelected = ref(false);
const selectedProductExclusions = ref<Partial<Product[]>>([]);
</script>

<template>
<div class="flex flex-col items-center gap-5 mt-8">
  <p class="font-recoleta-regular text-lg">{{ $t('order.steps.stepCustomize.section4') }}</p>
  <div class="flex items-center gap-5">
    <Button
        class="text-xl"
        :label="$t('order.steps.stepCustomize.section4.yes-btn')"
        outlined
        @click="isExclusionSelected = true"
    />
    <Button
        :class="['text-xl', !isExclusionSelected ? 'bg-green-primary' : 'bg-transparent']"
        :label="$t('order.steps.stepCustomize.section4.no-btn')"
        outlined
        active
        @click="isExclusionSelected = false"
    />
  </div>
  <span class="font-solina-extended-book text-base leading-6">
    <strong>{{ $t('order.steps.stepCustomize.exclusions.bold', {max: 6}) }}</strong>
    {{ $t('order.steps.stepCustomize.exclusions') }}
  </span>
  <Listbox
      v-if="isExclusionSelected"
      v-model="selectedProductExclusions"
      :options="productExclusions"
      filter optionLabel="name"
      class="w-full"
      :filterPlaceholder="$t('order.steps.stepCustomize.section4.search')">
    <template #option="slotProps">
      <div class="flex items-center">
        <Checkbox v-model="selectedProductExclusions" :inputId="slotProps.option.id" :name="slotProps.option.name" :value="slotProps.option.id" />
        <label for="exclusions" class="ml-2">{{ slotProps.option.name }}</label>
      </div>
    </template>
  </Listbox>
</div>
</template>
