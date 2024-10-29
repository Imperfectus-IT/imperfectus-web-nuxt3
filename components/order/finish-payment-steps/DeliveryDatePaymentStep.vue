<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'
import type { ValidHour } from '~/composables/shared/utils/types/ValidHour.ts'
import { useSleep } from '~/composables/shared/useSleep.ts'
import { useFormPaymentHandler } from '~/composables/payment/application/form/useFormPaymentHandler.ts'
import { useUpdateDeliveryHandler } from '~/composables/orders/application/update-delivery/useUpdateDeliveryHandler.ts'

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

const { sleep } = useSleep()
const { url, body, formPaymentHandler } = useFormPaymentHandler()
const formRef = ref<HTMLFormElement | null>(null)
const { executeUpdateDeliveryHandler } = useUpdateDeliveryHandler()
const isLoading = ref(false)

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

const isInValid = computed(() => {
  return !selectedDate.value || !selectedHour.value
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

const completeStep = async () => {
  try {
    isLoading.value = true
    await executeUpdateDeliveryHandler(props.order.id, dayjs(selectedDate.value).format('YYYY-MM-DD'), selectedHour.value)
    await goToPayment()
  }
  catch (error) {
    console.info('completeStep error')
    console.info(error.message)
  }
  finally {
    isLoading.value = false
  }
}

const goToPayment = async () => {
  try {
    await formPaymentHandler(props.order.id)

    if (!url.value || !formRef.value) {
      paymentNotAvailable.value = true
      return
    }

    await sleep(200)
    console.info('submitting form')
    formRef.value.submit()
  }
  catch (error) {
    console.info('orderpaymentform error')
    console.info(error.message)
  }
}
</script>

<template>
  <div class="flex flex-col lg:mt-14 lg:items-center lg:justify-center">
    <Loading
      :is-loading="isLoading"
      image="/images/products/fruits/Poma.webp"
    />

    <div class="my-auto flex lg:border-[1px] lg:w-[50%] lg:mt-14 lg:rounded-lg lg:px-14 lg:py-8">
      <div class="flex flex-col">
        <p class="hidden text-center text-lg font-normal font-recoleta-regular lg:block lg:text-start lg:text-xl">
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
              class="flex h-7 w-7 items-center justify-center rounded-md bg-green-primary text-[13px]"
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

        <div class="mt-5 w-64 text-center align-baseline">
          <span class="inline-block rounded-xl align-top text-lg mdi mdi-square-outline" />
          <span class="mr-3 inline-block align-top">{{ $t('orderStepDate.available') }}</span>
          <span class="inline-block rounded-xl align-top text-lg mdi mdi-square text-green-primary" />
          <span class="inline-block align-top">{{ $t('orderStepDate.selected') }}</span>
        </div>
      </div>

      <div class="mx-auto max-w-sm self-center center">
        <p class="mb-2 font-semibold font-recoleta-regular text-[16px]">
          {{ $t('deliveryDatePayment.timeSlot') }}
        </p>
        <Dropdown
          v-model="selectedHour"
          :options="mapValidHours(validHours)"
          option-label="label"
          option-value="value"
          class="mt-2 mb-5 text-[16px] lg:mt-0"
        />

        <p class="mt-2 mb-2 font-semibold font-recoleta-regular text-[16px]">
          {{ $t('deliveryDatePayment.attention') }}
        </p>

        <span class="font-recoleta-regular text-[16px]">
          {{ $t('deliveryDatePayment.message_1') }}
        </span>
        <span class="ml-1 font-semibold font-recoleta-regular text-[16px]">
          {{ $t('deliveryDatePayment.message_2') }}
        </span>
      </div>
    </div>

    <CompletePaymentActions
      v-model:form-ref="formRef"
      class="mt-16 mb-16"
      :order="order"
      :url="url"
      :body="body"
      :disabled="isInValid"
      @on-submit="() => completeStep()"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
