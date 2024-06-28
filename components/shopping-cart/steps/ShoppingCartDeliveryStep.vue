<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'
import { PAYMENT_STEP } from '~/composables/shopping_cart/types/ShoppingCartConstants.ts'

const emit = defineEmits(['goToStep'])
const { t } = useI18n()
const { dateBuilder } = useDateBuilder()
const { shoppingCart } = useShoppingCartState()
const textData = {
  section: 'shopping_cart.deliveryStep.',
  options: 4,
}
const selectedDate = ref(dayjs().toDate())
const isSelectedDate = (date: CalendarDate) => {
  const formattedDate = dateBuilder(date)
  return dayjs(formattedDate).format('YYYY-MM-DD') === dayjs(selectedDate.value).format('YYYY-MM-DD')
}
// const emit = defineEmits(['goToStep'])

const getOptions = (optionsQuantity: number) => {
  const options = []
  let index = 0
  while (index < optionsQuantity) {
    options.push({
      label: t(`${textData.section}selectSection.option_${index}.label`),
      value: t(`${textData.section}selectSection.option_${index}.value`),
    })
    index++
  }
  return options
}

const getDateCellStyle = (date: CalendarDate) => {
  return date.selectable ? 'border-[1px] rounded-md w-7 h-7 flex justify-center items-center text-[13px]' : 'text-[13px]'
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[35%] 2xl:px-[40%] ">
    <div class="flex items-center justify-center gap-3 mt-3 relative">
      <Button
        class="w-[2rem] h-[2rem] text-xl !absolute left-0"
        icon="mdi mdi-chevron-left"
        rounded
        outlined
      />
      <p class="font-recoleta-regular text-xl font-normal text-center w-2/3">
        {{ $t(`${textData.section}title`) }}
      </p>
    </div>
    <p class="font-recoleta-semibold my-5 text-[16px]">
      {{ $t(`${textData.section}subtitle`) }}
    </p>
    <div class="flex justify-center">
      <Calendar
        v-model="selectedDate"
        inline
        :disabled-days="[0, 1, 6]"
      >
        <template #date="slotProps">
          <div
            v-if="isSelectedDate(slotProps.date)"
            class="bg-green-primary rounded-md w-7 h-7 flex justify-center items-center text-[13px]"
          >
            {{ slotProps.date.day }}
          </div>
          <div
            v-else
            :class="getDateCellStyle(slotProps.date)"
          >
            {{ slotProps.date.day }}
          </div>
        </template>
      </Calendar>
    </div>
    <div class="flex flex-row justify-evenly my-8">
      <span>
        <span class="mdi mdi-square-outline" />
        Disponible
      </span>
      <span>
        <span class="mdi mdi-square text-green-primary rounded-md !w-10" />
        Seleccionado
      </span>
    </div>
    <p class="font-recoleta-semibold">
      {{ $t(`${textData.section}selectSection.title`) }}
    </p>
    <Dropdown
      v-model="shoppingCart.preferredHour"
      :options="getOptions(4)"
      option-label="label"
      option-value="value"
    />
    {{ shoppingCart.preferredHour }}
    <p class="font-recoleta-semibold mt-5">
      {{ $t(`${textData.section}comment.title`) }}
    </p>
    <p class="text-[12px] mt-2 mb-6">
      {{ $t(`${textData.section}comment.description`) }}
    </p>
    <div class="flex justify-center">
      <Button
        severity="secondary"
        :label="$t(`${textData.section}button`) "
        @click.prevent="$emit('goToStep', PAYMENT_STEP)"
      />
    </div>
  </div>
</template>
