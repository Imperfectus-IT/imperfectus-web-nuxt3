<template>
  <Panel
    v-model:collapsed="isCollapsed"
    :toggleable="true"
    :pt="{
      header: ({ props, state }) => ({
        class: [
          'rounded-t-lg py-3 px-5 flex justify-between',
          { 'border-[1px] rounded-lg': state.d_collapsed },
          { 'border-[1px] border-b-0': !state.d_collapsed },
        ],
      }),
    }"
  >
    <template #header>
      <div>
        <h4 class="font-recoleta-medium text-[26px]">
          {{ $t('adminOrderDetails.deliveryCompany') }}
        </h4>
        <p
          v-if="isCollapsed"
          class="font-bold mt-5 text-[16px]"
        >
          {{ $t('orderStepDate.carrier.now') }}
        </p>
        <div
          v-if="isCollapsed"
          class="flex items-center mt-5"
        >
          <RadioButton
            input-id="coverage"
            name="coverage"
          />
          <label
            for="coverage"
            class="ml-2 text-[16px] font-normal leading-5 lg:text-md"
          >
            {{ coveragesOptions.find(coverage => selectedCoverage.shippingCoverage === coverage.value)?.label }}
          </label>
        </div>
        <div
          v-if="preselectedPickUpPointId"
          class="flex flex-col text-[12px] font-solina-extended-medium "
        >
          <label
            class=" font-bold leading-5 cursor-pointer"
          ><p>{{ preselectedPickUpPoint?.name }}: <span class="uppercase">{{ preselectedPickUpPoint?.city }}</span></p></label>
          <p>
            {{ preselectedPickUpPoint?.address }}
          </p>
          <p>
            {{ preselectedPickUpPoint?.city }} {{ preselectedPickUpPoint?.postcode }}
          </p>
        </div>
      </div>
    </template>
    <p class="text-[16px] font-solina-extended-medium mr-4 leading-7">
      {{ $t('orderStepDate.carrier.label') }}
    </p>
    <div
      v-for="(carrier, index) in coveragesOptions"
      :key="carrier.value"
      class="mt-3"
    >
      <div class="flex items-center text-[16px]">
        <RadioButton
          v-model="selectedCoverage.shippingCoverage"
          :input-id="carrier.label"
          name="coverage"
          :value="carrier.value"
        />
        <label
          :for="carrier.label"
          class="ml-2 text-md font-normal leading-5 cursor-pointer"
        >{{ carrier.label }}</label>
        <span
          v-if="index === 0"
          class="mdi mdi-star text-lg text-green-primary ml-3"
        />
      </div>
      <Divider class="mt-2" />
    </div>
    <div class="flex flex-row items-center">
      <span class="mdi mdi-star text-lg text-green-primary mr-3" />
      <p class="mr-2 text-[14px] italic">
        {{ $t('orderStepDate.carrier.recommended') }}
      </p>
    </div>
    <div v-if="displayPickUpPoints">
      <p class="text-[16px] font-solina-extended-medium mr-4 leading-7 my-5">
        {{ '¿Qué punto de recogida prefieres?' }}
      </p>
      <div
        v-for="pickUpPoint in pickUpPoints"
        :key="pickUpPoint"
      >
        <div class="flex items-start text-[14px]">
          <RadioButton
            v-model="selectedCoverage.shippingOffice"
            class="mr-2"
            :input-id="pickUpPoint.id"
            name="pickuppoint"
            :value="pickUpPoint.id"
          />
          <div class="flex flex-col text-[12px] font-solina-extended-medium ">
            <label
              :for="pickUpPoint.id"
              class=" font-bold leading-5 cursor-pointer"
            ><p class="m">{{ pickUpPoint.name }}: <span class="uppercase">{{ pickUpPoint.city }}</span></p></label>
            <p>
              {{ pickUpPoint.address }}
            </p>
            <p>
              {{ pickUpPoint.city }} {{ pickUpPoint.postcode }}
            </p>
          </div>
        </div>
        <Divider class="mt-2" />
      </div>
    </div>
    <Button
      class="ml-auto mr-0"
      :pt="{
        root: 'border-[1px] rounded-lg w-24 mt-3 py-2 disabled:cursor-not-allowed disabled:opacity-50',
        label: 'text-[14px] lg:text-md',
      }"
      :label="'Guardar'"
      :disabled="!canSaveChanges"
      @click="handleUpdateCoverage"
    />
  </Panel>
</template>

<script setup lang="ts">
const props = defineProps<{
  availableCoverages: string[]
  subscriptionShippingCoverage: SubscriptionCoverage
  postcode: string
}>()
const emits = defineEmits(['update-coverage'])
const { executeGetSeurPickUpPoints } = useGetSeurPickUpPoints()
const { executeGetCorreosPickUpPoints } = useGetCorreosPickUpPoints()
const { executeGetPickUpPointById } = useGetPickUpPointById()

const isCollapsed = ref<boolean>(true)
const displayPickUpPoints = ref<boolean>(false)

const coveragesOptions = Object.values(ALL_COVERAGES).filter(coverage => props.availableCoverages.includes(coverage.value))
const selectedCoverage = ref<SubscriptionCoverage>({
  shippingCoverage: coveragesOptions.find(coverage => props.subscriptionShippingCoverage.shippingCoverage === coverage.value)?.value as string,
  shippingService: props.subscriptionShippingCoverage.shippingService,
  shippingOffice: props.subscriptionShippingCoverage.shippingOffice,
})

const preselectedPickUpPointId = ref<string | null>(props.subscriptionShippingCoverage.shippingOffice || null)
const preselectedPickUpPoint = ref<PickUpPoint | null>(null)
const pickUpPoints = ref<PickUpPoint[]>([])
const canSaveChanges = computed(() => selectedCoverage.value === ALL_COVERAGES.SEUR.label ? preselectedPickUpPointId.value !== '' : true)

onMounted(async () => {
  if (selectedCoverage.value.shippingService === ALLSERVICES.PICK_UP_POINT) {
    await getSelectedPickUpPoint()
  }
})

const getSelectedPickUpPoint = async () => {
  pickUpPoints.value = props.subscriptionShippingCoverage.shippingCoverage === ALL_COVERAGES.SEUR.value
    ? await executeGetSeurPickUpPoints(props.postcode)
    : await executeGetCorreosPickUpPoints(props.postcode)
  preselectedPickUpPoint.value = pickUpPoints.value.filter(pickUpPoint => pickUpPoint.id === preselectedPickUpPointId.value)[0]
  displayPickUpPoints.value = true
}

watch(selectedCoverage, async (newValue, oldValue) => {
  const { shippingCoverage, shippingService } = newValue
  const oldShippingService = oldValue.shippingService
  if (shippingCoverage === ALL_COVERAGES.SEUR.value) {
    pickUpPoints.value = await executeGetSeurPickUpPoints(props.postcode)
    selectedCoverage.value.shippingService = ALLSERVICES.PICK_UP_POINT
    displayPickUpPoints.value = true
  }
  else if (shippingCoverage === ALL_COVERAGES.CORREOSEXPRESS.value) {
    if (shippingService === ALLSERVICES.PICK_UP_POINT && oldShippingService !== ALLSERVICES.PICK_UP_POINT) {
      pickUpPoints.value = await executeGetCorreosPickUpPoints(props.postcode)
      displayPickUpPoints.value = true
    }
    selectedCoverage.value.shippingService = ALLSERVICES.CORREOSB2C
    selectedCoverage.value.shippingOffice = null
    pickUpPoints.value = []
    displayPickUpPoints.value = false
  }
  else {
    selectedCoverage.value.shippingService = null
    selectedCoverage.value.shippingOffice = null
    pickUpPoints.value = []
    displayPickUpPoints.value = false
  }
}, { deep: true })

const handleUpdateCoverage = async () => {
  preselectedPickUpPointId.value = null
  pickUpPoints.value = []
  emits('update-coverage', selectedCoverage.value)
  if (selectedCoverage.value.shippingService === ALLSERVICES.PICK_UP_POINT) {
    await getSelectedPickUpPoint()
  }
  displayPickUpPoints.value = false
  isCollapsed.value = true
}
</script>
