<template>
  <Panel>
    <h4 class="text-[26px] font-recoleta-medium mb-5">
      {{ $t(`${textData.section}title`) }}
    </h4>
    <div class="w-full">
      <div
        v-for="(item, index) in textData.dropdowns"
        :key="item.label"
      >
        <h4 class="font-bold text-[16px]">
          {{ $t(`${textData.section}item_${index}.title`) }}
        </h4>
        <Dropdown
          v-model="periodicity[item.label as keyof Periodicity]"
          :options="getOptions(item.options as number, index)"
          option-label="label"
          option-value="value"
          class="w-full text-[16px] mt-2 mb-5 lg:mt-0"
        />
      </div>
      <div class="flex justify-center">
        <Button
          outlined
          :label="$t(`${textData.section}button`)"
          :pt="{
            root: 'border-[1px] px-3.5 py-2 rounded-lg my-3 w-1/3',
          }"
          @click="handleSaveModifyPeriodicity"
        />
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { Periodicity } from '~/components/admin/my-subscriptions/types/Periodicity.ts'
import type { Subscription } from '~/composables/admin/subscriptions/domain/SubscriptionTypes.ts'

const { t } = useI18n()
const props = defineProps<{
  subscription: Subscription
}>()

const emits = defineEmits(['saveModifyPeriodicity'])

const periodicity = reactive<Periodicity>({
  frequency: props.subscription.frequency,
  preferredDay: props.subscription.preferredDay,
  preferredHour: props.subscription.preferredHour,
})

const textData = {
  section: 'subscriptions.subscription.modifyPeriodicity.',
  dropdowns: [
    { label: 'frequency', options: 2 },
    { label: 'preferredDay', options: 4 },
    { label: 'preferredHour', options: 3 },
  ],
}

const getOptions = (optionsQuantity: number, iterationNumber: number) => {
  const options = []
  let index = 0
  while (index < optionsQuantity) {
    options.push({
      label: t(`${textData.section}item_${iterationNumber}.option_${index}.label`),
      value: t(`${textData.section}item_${iterationNumber}.option_${index}.value`),
    })
    index++
  }
  return options
}

const handleSaveModifyPeriodicity = () => {
  emits('saveModifyPeriodicity', periodicity)
}
</script>
