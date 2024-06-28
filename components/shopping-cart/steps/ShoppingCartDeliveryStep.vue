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
  <div class="px-10 relative">
    <div class="flex items-center justify-center gap-3 mt-3 ">
      <div class="!absolute left-5 flex flex-row gap-3 lg:mt-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
        />
        <span class="my-auto hidden lg:block">Volver</span>
      </div>
      <p class="font-recoleta-regular text-xl font-normal text-center w-2/3 lg:hidden">
        {{ $t(`${textData.section}title`) }}
      </p>
    </div>

    <div class="lg:flex lg:flex-row lg:justify-evenly lg:w-4/6 lg:border-[1px] lg:rounded-lg lg:p-4 lg:mt-10 lg:relative">
      <div>
        <p class="font-recoleta-semibold my-5 text-[16px] lg:text-2xl lg:absolute lg:left-0 lg:w-full lg:text-center">
          {{ $t(`${textData.section}subtitle`) }}
        </p>
        <div class="flex justify-center lg:w-full lg:mt-24">
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
        <div class="flex flex-row justify-evenly my-8 lg:text-[20px]">
          <span>
            <span class="mdi mdi-square-outline" />
            Disponible
          </span>
          <span>
            <span class="mdi mdi-square text-green-primary rounded-md !w-10" />
            Seleccionado
          </span>
        </div>
      </div>
      <div class="lg:my-auto lg:w-1/2 lg:text-[20px]">
        <p class="font-recoleta-semibold">
          {{ $t(`${textData.section}selectSection.title`) }}
        </p>
        <Dropdown
          v-model="shoppingCart.preferredHour"
          :options="getOptions(4)"
          option-label="label"
          option-value="value"
          class="lg:w-full"
        />
        <p class="font-recoleta-semibold mt-5">
          {{ $t(`${textData.section}comment.title`) }}
        </p>
        <p class="text-[12px] mt-2 mb-6 lg:text-[16px] lg:hidden">
          {{ $t(`${textData.section}comment.mobileDescription`) }}
        </p>
        <p class="text-[12px] mt-2 mb-6 lg:text-[16px] hidden lg:block">
          {{ $t(`${textData.section}comment.desktopDescription`) }}
        </p>
      </div>
    </div>
    <div class="flex justify-center lg:mt-6">
      <Button
        severity="secondary"
        :label="$t(`${textData.section}button`) "
        @click.prevent="$emit('goToStep', PAYMENT_STEP)"
      />
    </div>
  </div>
</template>
