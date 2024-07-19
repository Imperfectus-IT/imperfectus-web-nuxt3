<script setup lang="ts">
import dayjs from 'dayjs'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'

const emit = defineEmits(['goToStep'])
const { dateBuilder } = useDateBuilder()
const { shoppingCart } = useShoppingCartState()

const selectedDate = ref(dayjs().toDate())
const isSelectedDate = (date: CalendarDate) => {
  const formattedDate = dateBuilder(date)
  return dayjs(formattedDate).format('YYYY-MM-DD') === dayjs(selectedDate.value).format('YYYY-MM-DD')
}

const getDateCellStyle = (date: CalendarDate) => {
  return date.selectable ? 'border-[1px] rounded-md w-7 h-7 flex justify-center items-center text-[13px]' : 'text-[13px]'
}
</script>

<template>
  <div class="px-10 md:px-[28%] lg:px-[2%] 2xl:px-[20%] relative">
    <div class="flex items-center justify-center gap-3 lg:mt-14">
      <div class="!absolute left-5 flex flex-row gap-3">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="emit('goToStep', SHIPPING_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
      <p class="font-recoleta-regular text-lg font-normal text-center w-2/3 lg:text-2xl lg:hidden mt-5">
        {{
          $t("orderStepDate.message")
        }}
      </p>
    </div>
    <div class="lg:flex gap-5">
      <div class="lg:border-[1px] lg:rounded-lg lg:px-14 lg:py-8 lg:w-[57%] lg:mt-14">
        <p class="font-recoleta-regular text-lg font-normal text-center lg:text-start lg:text-xl hidden lg:block">
          {{
            $t("orderStepDate.message")
          }}
        </p>
        <Calendar
          v-model="selectedDate"
          class="mt-5"
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
        <div class="w-64 text-center align-baseline mt-5">
          <span class="mdi mdi-square-outline text-lg inline-block align-top rounded-xl" />
          <span class="inline-block align-top mr-3">{{ $t('orderStepDate.available') }}</span>
          <span class="mdi mdi-square text-green-primary text-lg inline-block align-top rounded-xl" />
          <span class="inline-block align-top">{{ $t('orderStepDate.selected') }}</span>
        </div>
      </div>
      <div class="hidden lg:block lg:border-[1px] lg:rounded-lg lg:px-14 lg:py-8 mt-14">
        <ShoppingCartSummaryBox>
          <template #title>
            <h3 class="font-recoleta-semibold text-center text-xl font-medium mb-3">
              {{ $t('order.steps.stepResume') }}
            </h3>
          </template>
        </ShoppingCartSummaryBox>
      </div>
    </div>
    <div class="flex justify-center mt-6">
      <Button
        severity="secondary"
        :label="$t('orderMeta.continue')"
        @click.prevent="$emit('goToStep', DELIVERY_STEP)"
      />
    </div>
    <ShoppingCartPurchaseSummaryFloating
      v-if="shoppingCart.currentItem"
      class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden"
      :item="shoppingCart.currentItem"
    />
  </div>
</template>
