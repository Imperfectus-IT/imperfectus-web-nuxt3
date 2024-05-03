<template>
  <div
    class="bg-green-quaternary font-solina-extended-book text-[16px] flex flex-col gap-3 !rounded-b-[20px] lg:rounded-[20px]"
  >
    <div class="px-4 flex flex-col gap-5 lg:ml-6">
      <h4 class="text-[28px] mt-4 lg:mt-8">
        {{ data.title }}
      </h4>
      <p class="font-bold">
        {{ data.price }}
      </p>
      <p>{{ data.description }}</p>

      <div class="flex flex-col gap-6 font-solina-extended-medium">
        <div class="flex flex-col">
          <span>{{ t("boxes.label.type") }}</span>
          <Dropdown
            :model-value="selectedBox.content"
            :options="getSelectedBoxData"
            :pt="{
              input: 'font-solina-extended-medium text-[16px]',
              trigger: 'ml-auto',
            }"
            option-label="name"
            option-value="value"
            class="w-72"
            @update:model-value="updateContentOnParent"
          />
        </div>
        <div class="flex flex-col">
          <span>{{ t("boxes.label.buy") }}</span>
          <Dropdown
            :model-value="selectedBox.frequency"
            :options="purchaseOptions"
            :pt="{
              input: 'font-solina-extended-medium text-[16px]',
              trigger: 'ml-auto',
            }"
            option-label="name"
            option-value="value"
            class="w-72"
            @update:model-value="updateFrequencyOnParent"
          />
        </div>
        <div class="flex flex-col">
          <span>{{ t("boxes.label.units") }}</span>
          <Dropdown
            :model-value="selectedBox.units"
            :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :pt="{
              input: 'font-solina-extended-medium text-[16px]',
              trigger: 'ml-auto',
            }"
            class="w-72"
            @update:model-value="updateUnitsOnParent"
          />
        </div>
      </div>

      <p class="text-grey-secondary">
        {{ t("boxes.free-shipping") }}
      </p>
    </div>
    <Button
      class="w-full py-5 border-t-0 rounded-t-[0px] rounded-b-[20px] font-solina-extended-medium lg:mt-auto"
      :label="t('string.misc.buy.now')"
      severity="secondary"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { SelectedBox } from '../types/BoxSelected'

const { t } = useI18n()

const props = defineProps<{
  data: {
    title: string
    description: string
    price: string
  }
  selectedBox: SelectedBox
  boxOptions: Array<{ name: string, value: string }>
}>()

const getSelectedBoxData = computed(() => {
  return props.boxOptions.length > 0 ? props.boxOptions : TKBoxOptions
})

const emit = defineEmits(['updateItemOnParent'])

const updateContentOnParent = (newContent: string) => {
  emit('updateItemOnParent', { ...props.selectedBox, content: newContent })
}

const updateFrequencyOnParent = (newFrequency: string) => {
  emit('updateItemOnParent', { ...props.selectedBox, frequency: newFrequency })
}

const updateUnitsOnParent = (newUnits: string) => {
  emit('updateItemOnParent', { ...props.selectedBox, units: newUnits })
}

const TKBoxOptions = [
  {
    name: t('string.box.mixed'),
    value: 'mixed',
  },
  {
    name: t('string.box.vegetables'),
    value: 'vegetables',
  },
  {
    name: t('string.box.fruits'),
    value: 'fruits',
  },
]

const purchaseOptions = [
  {
    name: t('content.boxes.purchaseOption2'),
    value: 'weekly',
  },
  {
    name: t('content.boxes.purchaseOption3'),
    value: 'biweekly',
  },
  {
    name: t('content.boxes.purchaseOption1'),
    value: 'once',
  },
]
</script>
