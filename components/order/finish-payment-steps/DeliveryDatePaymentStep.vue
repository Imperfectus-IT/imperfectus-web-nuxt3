<script setup lang="ts">
import dayjs from 'dayjs'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'
import type { ValidHour } from '~/composables/shared/utils/types/ValidHour.ts'

const props = defineProps({
  order: {
    type: Object as () => Order,
    required: true,
  },
})

const { t } = useI18n()
const { dateBuilder } = useDateBuilder()
const { timeSlot, getTimeSlotHandler } = useGetTimeSlotHandler()
const { validHours, getValidHoursHandler } = useValidHoursHandler()
const { unavailableDates, getUnavailableDates } = useUnavailableDatesHandler()
const { availableWeekDays, getAvailableWeekDaysHandler } = availableWeekDaysHandler()

const selectedDate = ref(null)
const selectedHour = ref(null)
const minDate = ref(dayjs().add(2, 'day').toDate())

onMounted(async () => {
  await getTimeSlotHandler(props.order.shippingInfo.shippingPostCode, props.order.shippingInfo.shippingCoverage, selectedDate.value)
  await getUnavailableDates(props.order.orderItems.map(item => item.product.id), props.order.shippingInfo.shippingPostCode, props.order.shippingInfo.shippingCoverage)
  await getAvailableWeekDaysHandler(props.order.shippingInfo.shippingPostCode, props.order.shippingInfo.shippingCoverage)
})

watch(timeSlot, async (newTimeSlot) => {
  console.info('newTimeSlot', newTimeSlot)
  await getValidHoursHandler(newTimeSlot)
})

watch(validHours, (newValidHours: ValidHour[]) => {
  console.info('newValidHours', newValidHours)
  const firstTimeSlot = newValidHours[0]
  const currentHour: ValidHour = validHours.value.find(hour => hour.timeSlot === props.order.deliveryHour)
  if (currentHour) {
    selectedHour.value = currentHour.timeSlot
  }
  else {
    selectedHour.value = firstTimeSlot.timeSlot
  }
})

const disabledDays = computed(() => {
  const allDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return allDays
    .map((day, index) => (availableWeekDays.value.includes(day) ? null : index))
    .filter(day => day !== null)
})

const isSelectedDate = (date: CalendarDate) => {
  const formattedDate = dateBuilder(date)
  return dayjs(formattedDate).format('YYYY-MM-DD') === dayjs(selectedDate.value).format('YYYY-MM-DD')
}

const getDateCellStyle = (date: CalendarDate) => {
  return date.selectable ? 'border-[1px] rounded-md w-7 h-7 flex justify-center items-center text-[13px]' : 'text-[13px]'
}

const mapValidHours = (validHours: ValidHour[]) => {
  return validHours.map(hour => ({
    label: t('string.hour.timeSlot', { from: hour.from, to: hour.to }),
    value: hour.timeSlot,
  }))
}
</script>

<template>
  <div>
    <pre>SelectedHour: {{ selectedHour }}</pre>
    <pre>UnavailableDates: {{ unavailableDates }}</pre>
    <pre>availableWeekDays: {{ availableWeekDays }}</pre>
    <pre>validHours: {{ validHours }}</pre>
    <pre>timeSlot: {{ timeSlot }}</pre>
    <pre>Products: {{ props.order.orderItems.map(item => item.product.id) }}</pre>

    <div class="flex my-auto lg:border-[1px] lg:rounded-lg lg:px-14 lg:py-8 lg:w-[50%] lg:mt-14">
      <div class="flex flex-col ">
        <p class="font-recoleta-regular text-lg font-normal text-center lg:text-start lg:text-xl hidden lg:block">
          {{
            $t("orderStepDate.message")
          }}
        </p>
        <Calendar
          v-model="selectedDate"
          class="mt-5"
          inline
          :disabled-dates="unavailableDates"
          :disabled-days="disabledDays"
          :min-date="minDate"
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

      <div class="self-center center mx-auto  max-w-sm">
        <p class="font-recoleta-regular text-[16px] font-semibold   mb-2">
          {{ $t('deliveryDatePayment.timeSlot') }}
        </p>
        <Dropdown
          v-model="selectedHour"
          :options="mapValidHours(validHours)"
          option-label="label"
          option-value="value"
          class="text-[16px] mt-2 mb-5 lg:mt-0"
        />

        <p class="font-recoleta-regular text-[16px] font-semibold mt-2 mb-2">
          {{ $t('deliveryDatePayment.attention') }}
        </p>

        <span class="font-recoleta-regular text-[16px]">
          {{ $t('deliveryDatePayment.message_1') }}
        </span>
        <span class="font-recoleta-regular text-[16px] font-semibold ml-1">
          {{ $t('deliveryDatePayment.message_2') }}
        </span>
      </div>
    </div>
  </div>>
</template>

<style scoped lang="scss">

</style>
