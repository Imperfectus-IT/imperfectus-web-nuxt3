<script setup lang="ts">
import dayjs from 'dayjs'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'
import { DayMapping } from '~/components/admin/my-subscriptions/DayMapping.ts'
import type { ValidHour } from '~/composables/shared/utils/types/ValidHour.ts'
import ShoppingCartTopSummaryBoxSmall from '~/components/shopping-cart/partials/ShoppingCartTopSummaryBoxSmall.vue'
import { createEmpty as createEmptyShoppingCartItem } from '~/composables/shopping-cart/domain/Item.ts'
import { ALLSERVICES } from '@/composables/locations/domain/ServicesConstants.ts'

const emit = defineEmits([GO_TO_STEP_EVENT])
const { shoppingCart } = useShoppingCartState()
const { t } = useI18n()
const deliveryType = ref(HOME_DELIVERY_TYPE)

const { executeGetShippingCompanies } = useGetShippingCompanies()
const { executeGetSeurPickUpPoints } = useGetSeurPickUpPoints()
const { executeGetCorreosPickUpPoints } = useGetCorreosPickUpPoints()
const { dateBuilder } = useDateBuilder()
const { timeSlot, getTimeSlotHandler } = useGetTimeSlotHandler()
const { validHours, getValidHoursHandler } = useValidHoursHandler()
const { unavailableDates, getUnavailableDates } = useUnavailableDatesHandler()
const { availableWeekDays, getAvailableWeekDaysHandler } = availableWeekDaysHandler()

const setHomeDelivery = () => {
  deliveryType.value = HOME_DELIVERY_TYPE
  shoppingCart.value.shippingAddress.shippingCoverage.shippingCoverage = ''
  shoppingCart.value.shippingAddress.shippingCoverage.shippingOffice = null
  shoppingCart.value.shippingAddress.shippingCoverage.shippingService = null
}

const setPickupPointDelivery = () => {
  deliveryType.value = PICKUP_POINT_DELIVERY_TYPE
  shoppingCart.value.shippingAddress.shippingCoverage.shippingCoverage = ''
  shoppingCart.value.shippingAddress.shippingCoverage.shippingOffice = null
  shoppingCart.value.shippingAddress.shippingCoverage.shippingService = ALLSERVICES.PICK_UP_POINT
}
const hasAllDataSet = computed(() => {
  const { shippingCoverage, shippingOffice, shippingService } = shoppingCart.value.shippingAddress.shippingCoverage
  const { deliveryDate } = shoppingCart.value
  return !!shippingCoverage && !!deliveryDate && (shippingService !== ALLSERVICES.PICK_UP_POINT || !!shippingOffice)
})

const handleNewProduct = () => {
  emit(GO_TO_STEP_EVENT, CUSTOMIZE_STEP)
  shoppingCart.value.currentItem = createEmptyShoppingCartItem()
}

watch(() => shoppingCart.value.shippingAddress.shippingCoverage.shippingCoverage,
  async (newCoverage) => {
    const { shippingService } = shoppingCart.value.shippingAddress.shippingCoverage
    await getTimeSlotHandler(shoppingCart.value.shippingAddress.shippingPostCode, newCoverage)
    await getValidHoursHandler(timeSlot.value)
    await getAvailableWeekDaysHandler(shoppingCart.value.shippingAddress.shippingPostCode, shoppingCart.value.shippingAddress.shippingCoverage.shippingCoverage)
    newCoverage === ALL_COVERAGES.CORREOSEXPRESS.value && shippingService !== ALLSERVICES.PICK_UP_POINT
      ? shoppingCart.value.shippingAddress.shippingCoverage.shippingService = ALLSERVICES.CORREOSB2C
      : newCoverage !== ALL_COVERAGES.CORREOSEXPRESS.value && shippingService !== ALLSERVICES.PICK_UP_POINT
        ? shoppingCart.value.shippingAddress.shippingCoverage.shippingService = ''
        : ''
  },
)

const mapValidHours = (validHours: ValidHour[]) => {
  return validHours.map(hour => ({
    label: t('string.hour.timeSlot', { from: hour.from, to: hour.to }),
    value: hour.timeSlot,
  }))
}

const getItemProductIds = computed(() => shoppingCart.value.items.map(item => item.product.id))
onMounted(async () => {
  await getAvailableWeekDaysHandler(shoppingCart.value.shippingAddress.shippingPostCode, '')
  await getUnavailableDates(getItemProductIds.value, shoppingCart.value.shippingAddress.shippingPostCode, '')
})

const getFullAddress = computed(() => {
  return `${shoppingCart.value.shippingAddress.shippingAddress}, ${shoppingCart.value.shippingAddress.shippingPostCode}, ${shoppingCart.value.shippingAddress.shippingCity}, ${shoppingCart.value.shippingAddress.shippingCountry}`
})

// Calendar
const initializeCalendarDate = computed(() => {
  const minDateDayNumber = dayjs().add(2, 'd').day()
  const daysUntilThursday = (4 - minDateDayNumber + 7) % 7
  const firstThursday = dayjs().add(2 + daysUntilThursday, 'd').toDate()
  const isFirstThursdayUnavailable = unavailableDates.value.some((date: Date) => {
    return dayjs(date).format('YYYY-MM-DD') === dayjs(firstThursday).format('YYYY-MM-DD')
  })
  const FirstThursdayAvaiable = isFirstThursdayUnavailable ? dayjs(firstThursday).add(1, 'w').toDate() : firstThursday
  shoppingCart.value.deliveryDate = dayjs(FirstThursdayAvaiable).format('YYYY-MM-DD')
  return FirstThursdayAvaiable
})
const selectedDate = ref(initializeCalendarDate.value)

// Home delivery
const availableCarriers = ref<string[]>(await executeGetShippingCompanies(shoppingCart.value.shippingAddress.shippingPostCode, shoppingCart.value.deliveryDate))
const coveragesOptions = computed(() =>
  Object.values(ALL_COVERAGES).filter((coverage: CoverageOption) =>
    availableCarriers.value.includes(coverage.value),
  ),
)
// Update carriers availability and Timeslot
watch(selectedDate, async () => {
  shoppingCart.value.deliveryDate = dayjs(selectedDate.value).format('YYYY-MM-DD')
  try {
    availableCarriers.value = await executeGetShippingCompanies(
      shoppingCart.value.shippingAddress.shippingPostCode,
      shoppingCart.value.deliveryDate,
    )
  }
  catch (error) {
    console.error('Failed to fetch shipping companies:', error)
  }
})

const isSelectedDate = (date: CalendarDate) => {
  const formattedDate = dateBuilder(date)
  return dayjs(formattedDate).format('YYYY-MM-DD') === dayjs(selectedDate.value).format('YYYY-MM-DD')
}

const getDateCellStyle = (date: CalendarDate) => {
  return date.selectable ? 'border-[1px] rounded-md w-7 h-7 flex justify-center items-center text-[13px]' : 'text-[13px]'
}

const getAvailableWeekDays = computed(() => {
  const allDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return allDays.filter(day => !availableWeekDays.value.includes(day)).map(day => DayMapping[day])
})
const getFormattedUnavailableDates = computed(() => unavailableDates.value.map(date => dayjs(date).toDate()))

// Pickup point delivery
const seurPickUpPoints = await executeGetSeurPickUpPoints(shoppingCart.value.shippingAddress.shippingPostCode)
const correosPickUpPoints = await executeGetCorreosPickUpPoints(shoppingCart.value.shippingAddress.shippingPostCode)
const pickupCarrierOptions = [ALL_COVERAGES.CORREOSEXPRESS, seurPickUpPoints.length > 0 ? ALL_COVERAGES.SEUR : null]
const pickupPointList = computed(() => {
  const coverageType = shoppingCart.value.shippingAddress.shippingCoverage.shippingCoverage
  if (coverageType === ALL_COVERAGES.SEUR.value) {
    return seurPickUpPoints
  }
  else if (coverageType === ALL_COVERAGES.CORREOSEXPRESS.value) {
    return correosPickUpPoints
  }
  return []
})
</script>

<template>
  <div class="px-5 relative">
    <div class="flex items-center justify-center gap-3 lg:mt-14">
      <div class="!absolute left-5 flex flex-row gap-3 mt-5">
        <Button
          class="w-[2rem] h-[2rem] text-xl "
          icon="mdi mdi-chevron-left"
          rounded
          outlined
          @click.prevent="emit(GO_TO_STEP_EVENT, SHIPPING_STEP)"
        />
        <span class="my-auto hidden lg:block">{{ $t('string.back') }}</span>
      </div>
    </div>
    <div class="lg:flex gap-5">
      <div class="my-auto lg:border lg:rounded-lg lg:px-14 lg:py-8 lg:w-[57%] mt-10 lg:mt-14 font-solina-extended-book text-xs leading-5">
        <div class="border rounded-lg lg:border-green-tertiary/50 p-4">
          <div class="flex justify-between items-center">
            <span>{{ shoppingCart.shippingAddress.shippingFirstName }} {{ shoppingCart.shippingAddress.shippingLastName }}</span>
            <Button
              class="text-[0.625rem] underline font-semibold leading-4"
              :pt="{
                root: '',
              }"
              @click.prevent="emit(GO_TO_STEP_EVENT, SHIPPING_STEP)"
            >
              {{ $t('orderStepDate.address.update') }}
            </Button>
          </div>
          <Divider class="text-grey-secondary" />
          <p class="leading-5">
            {{ getFullAddress }}
          </p>
        </div>
        <div>
          <p class="font-recoleta-regular text-lg font-normal text-center lg:text-start lg:text-[30px] lg:mt-10 lg:mb-3 hidden lg:block">
            {{
              $t("orderStepDate.message")
            }}
          </p>
          <Calendar
            id="calendar"
            v-model="selectedDate"
            class="mt-5"
            inline
            :disabled-days="[...getAvailableWeekDays, 1]"
            :disabled-dates="getFormattedUnavailableDates"
            :min-date="dayjs().add(2, 'd').toDate()"
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
        <div
          class="mt-6"
        >
          <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
            {{ $t('orderStepDate.nextDeliveryDay.methodType.title') }}
          </p>
          <InputGroup>
            <Button
              :class="['w-1/2 rounded-none rounded-l-xl h-[34px]', { 'bg-green-primary': deliveryType === PICKUP_POINT_DELIVERY_TYPE }]"
              :label="$t('orderStepDate.nextDeliveryDay.methodType.pickup')"
              outlined
              @click.prevent="setPickupPointDelivery"
            />
            <Button
              :class="['w-1/2 rounded-none rounded-r-xl h-[34px]', { 'bg-green-primary': deliveryType === HOME_DELIVERY_TYPE }]"
              :label="$t('orderStepDate.nextDeliveryDay.methodType.home')"
              outlined
              @click.prevent="setHomeDelivery()"
            />
          </InputGroup>
        </div>
        <div
          v-if="deliveryType === HOME_DELIVERY_TYPE"
          class="mt-6"
        >
          <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
            {{ $t('orderStepDate.carrier.label') }}
          </p>
          <div>
            <div
              v-for="(carrier, index) in coveragesOptions"
              :key="index"
              :class="['flex items-center mb-3 border cursor-pointer rounded-xl lg:w-2/3 p-3', { 'border-green-primary': shoppingCart.coverage === carrier }]"
              @click.prevent="shoppingCart.shippingAddress.shippingCoverage.shippingCoverage = carrier.value"
            >
              <RadioButton
                v-model="shoppingCart.shippingAddress.shippingCoverage.shippingCoverage"
                input-id="ingredient1"
                name="coverage"
                :value="carrier.value"
              />
              <label
                for="coverage"
                class="ml-2 text-xs font-normal leading-5"
              >{{ carrier.label }}</label>
              <span
                v-if="index === 0"
                class="mdi mdi-star text-lg text-green-primary ml-3"
              />
            </div>
            <div class="flex items-center gap-1">
              <span class="mdi mdi-star text-xl text-green-primary" />
              <p class="text-xs lg:text-base">
                {{ $t('Empresa de transporte recomendada según tu CP') }}
              </p>
            </div>
          </div>
          <div
            v-if="shoppingCart.shippingAddress.shippingCoverage.shippingCoverage"
            class="mt-6"
          >
            <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
              {{ $t('orderStepDate.time') }}
            </p>
            <Dropdown
              v-model="shoppingCart.preferredHour"
              :options="mapValidHours(validHours)"
              option-label="label"
              option-value="value"
              class="lg:w-full text-base"
            />
          </div>
        </div>
        <div
          v-if="deliveryType === PICKUP_POINT_DELIVERY_TYPE"
          class="mt-6"
        >
          <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
            Empresa de transporte:
          </p>
          <Dropdown
            v-model="shoppingCart.shippingAddress.shippingCoverage.shippingCoverage"
            :options="pickupCarrierOptions"
            option-label="label"
            option-value="value"
            class="lg:w-full text-base border rounded-lg"
            placeholder="Selecciona una empresa de transporte"
          />
          <div
            v-if="true"
            class="mt-6"
          >
            <p class="font-recoleta-regular mb-3 lg:mb-5 text-lg leading-6 lg:leading-10 lg:text-[1.875rem]">
              {{ $t('orderStepDate.carrier.preferredPickup') }}
            </p>
            <MDC
              class="bg-orange-primary p-4 leading-4 rounded-lg my-6"
              :value="$t('orderStepDate.carrier.caution')"
            />
            <div
              v-for="pickupPoint in pickupPointList"
              :key="pickupPoint.id"
              class="mb-3 cursor-pointer lg:w-2/3"
              @click.prevent="shoppingCart.shippingAddress.shippingCoverage.shippingOffice = pickupPoint.id"
            >
              <div class="flex items-start text-[14px]">
                <RadioButton
                  v-model="shoppingCart.shippingAddress.shippingCoverage.shippingOffice"
                  class="mr-2"
                  :input-id="pickupPoint?.id"
                  name="pickuppoint"
                  :value="pickupPoint?.id"
                />
                <div class="flex flex-col text-[12px] font-solina-extended-medium ">
                  <label
                    :for="pickupPoint?.id"
                    class=" font-bold leading-5 cursor-pointer"
                  ><p class="m">{{ pickupPoint?.name }}: <span class="uppercase">{{ pickupPoint?.city }}</span></p></label>
                  <p>
                    {{ pickupPoint?.address }}
                  </p>
                  <p>
                    {{ pickupPoint?.city }} {{ pickupPoint?.postcode }}
                  </p>
                </div>
              </div>
              <Divider class="mt-2" />
              <!--              <RadioButton -->
              <!--                v-model="shoppingCart.shippingAddress.shippingCoverage.shippingOffice" -->
              <!--                input-id="pickupPoint" -->
              <!--                name="pickupPoint" -->
              <!--                :value="pickupPoint.id" -->
              <!--              /> -->
              <!--              <label -->
              <!--                for="coverage" -->
              <!--                class="ml-2 text-xs font-normal leading-5" -->
              <!--              >{{ pickupPoint.address }}</label> -->
            </div>
          </div>
        </div>
      </div>
      <div class="my-auto hidden lg:block lg:border-[1px] lg:rounded-lg lg:mt-14 lg:p-5 lg:pt-8 lg:w-5/12">
        <ShoppingCartResumeBox
          :display-next-step-button="false"
          @add-new-product="handleNewProduct"
        >
          <template #title>
            <h3 class="font-recoleta-regular text-center lg:text-[36px] font-medium mb-3">
              {{ $t('order.steps.stepResume') }}
            </h3>
          </template>
          <template #boxCard>
            <ShoppingCartTopSummaryBoxSmall />
          </template>
        </ShoppingCartResumeBox>
      </div>
      <ShoppingCartPurchaseSummaryFloating
        class="fixed z-10 inset-x-0 bottom-0 w-full lg:hidden"
        :item="shoppingCart.currentItem"
      />
    </div>
    <div class="flex justify-center lg:mt-6">
      <Button
        :disabled="!hasAllDataSet"
        class="mt-4"
        severity="secondary"
        :label="$t('order.next')"
        @click.prevent="$emit(GO_TO_STEP_EVENT, PAYMENT_STEP)"
      />
    </div>
  </div>
</template>
