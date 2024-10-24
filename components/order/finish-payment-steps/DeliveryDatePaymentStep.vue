<script setup lang="ts">
import dayjs from 'dayjs'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'
import { useValidHoursHandler } from '~/composables/shared/utils/valid-hours/useValidHoursHandler.ts'

const props = defineProps({
  order: {
    type: Object as () => Order,
    required: true,
  },
})

const { dateBuilder } = useDateBuilder()
const { timeSlot, getTimeSlotHandler } = useGetTimeSlotHandler()
const { validHours, getValidHoursHandler } = useValidHoursHandler()

const selectedDate = ref(dayjs().toDate())

onMounted(async () => {
  await getTimeSlotHandler(props.order.shippingInfo.shippingPostCode, props.order.shippingInfo.shippingCoverage, selectedDate.value)
})

watch(timeSlot, async (newTimeSlot) => {
  console.info('newTimeSlot', newTimeSlot)
  await getValidHoursHandler(newTimeSlot)
})

const isSelectedDate = (date: CalendarDate) => {
  const formattedDate = dateBuilder(date)
  return dayjs(formattedDate).format('YYYY-MM-DD') === dayjs(selectedDate.value).format('YYYY-MM-DD')
}

const getDateCellStyle = (date: CalendarDate) => {
  return date.selectable ? 'border-[1px] rounded-md w-7 h-7 flex justify-center items-center text-[13px]' : 'text-[13px]'
}
</script>

<template>
  <div>
    <pre>PostCode: {{ order.shippingInfo.shippingPostCode }}</pre>
    <pre>Coverage: {{ order.shippingInfo.shippingCoverage }}</pre>
    <pre>TimeSlot: {{ timeSlot }}</pre>
    <pre>ValidHours: {{ validHours }}</pre>
    <div class="my-auto lg:border-[1px] lg:rounded-lg lg:px-14 lg:py-8 lg:w-[57%] lg:mt-14">
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
  </div>
</template>

<style scoped lang="scss">

</style>
