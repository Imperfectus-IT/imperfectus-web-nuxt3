<template>
  <Dialog
    :visible="true"
    modal
    :closable="false"
    :dismissable-mask="true"
    :header="$t(`${textData.section}title`)"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :pt="{
      root: 'bg-beige-primary rounded-lg text-green-tertiary lg:w-[800px] lg:px-28 lg:py-10',
      header: 'font-recoleta-regular text-green-tertiary text-center py-4',
      title: 'text-[30px]',
      content: '',
    }"
    class="px-6 w-full"
  >
    <div
      v-if="modalLayersDisplayed.pauseInfoModal"
      class="text-center"
    >
      <p class="mb-2">
        {{ $t(`${textData.section}paragraph_1`) }}
      </p>
      <NuxtLink
        :to="localePath({ name: 'admin-subscriptions-upcoming_orders-id' })"
      >
        <Button
          class="w-full mt-5 lg:mt-0 lg:w-5/6"
          :label="$t(`${textData.section}upcomingButton`)"
        />
      </NuxtLink>
      <p class="mt-6">
        {{ $t(`${textData.section}paragraph_2`) }}
      </p>
      <Dropdown
        v-model="pauseInfo.reasonPaused"
        :placeholder="$t(`${textData.section}placeholder`)"
        :options="generateDropdownOptions"
        option-value="value"
        option-label="label"
        class="lg:!w-3/4 mt-2"
        :pt="{
          root: ({ props, state }) => ({
            class:
              [
                'inline-flex relative w-full select-none cursor-pointer bg-transparent border-[1px] rounded-lg border-green-tertiary transition-all duration-200 hover:border-green-tertiary focus:border-green-tertiary',
                {
                  'outline-none outline-offset-0 ring-o': state.focused,
                },
                {
                  'opacity-60 pointer-events-none cursor-default': props.disabled,
                },
              ],
          }),
          wrapper: 'overflow-hidden max-w-[100vw] ',
          list: 'mx-auto',
        }"
      />
      <Textarea
        v-if="pauseInfo.reasonPaused === 'other'"
        v-model="pauseInfo.reasonPausedText"
        rows="4"
        :placeholder="$t(`${textData.section}placeholder`)"
        :pt="{
          root: 'border-[1px] mt-4 border-green-tertiary bg-transparent px-4 py-3 rounded-lg w-full mb-4 outline-none',
        }"
      />
      <div class="mt-5 flex flex-row justify-evenly mb-6">
        <Button
          :label="$t(`${textData.section}cancelButton`)"
          :pt="{
            root: '',
            label: 'underline text-green-tertiary',
          }"
          @click="closeModal"
        />
        <Button
          :disabled="!pauseInfo.reasonPaused"
          :label="$t(`${textData.section}nextButton`)"
          :pt="{
            root: ({ context }) => ({
              class: [{ 'opacity-60 cursor-not-allowed': context.disabled }],
            }),
            label: 'underline text-green-tertiary',
          }"
          @click="toggleModalLayers"
        />
      </div>
    </div>
    <div v-else-if="modalLayersDisplayed.pauseDatepickerModal">
      {{ pauseInfo }}
      <div class="flex justify-center">
        <Calendar
          v-model="pauseInfo.nextDeliveryDate"
          date-format="dd/m/yy"
          inline
          :disabled-days="[0, 1, 6]"
        >
          <template #date="slotProps">
            <div
              v-if="slotProps.date.today"
              class="text-[14px] border-[1px] h-8 w-8 text-center rounded-md flex items-center justify-center"
            >
              {{ slotProps.date.day }}
            </div>
            <div
              v-if="isNextDeliveryDateSelected(slotProps.date)"
              class="text-[14px] bg-green-primary h-8 w-8 text-center rounded-md flex items-center justify-center"
            >
              {{ slotProps.date.day }}
            </div>
          </template>
        </Calendar>
      </div>
      <div class="my-5 flex flex-row justify-evenly">
        <Button
          :label="$t(`${textData.section}backButton`)"
          :pt="{
            root: '',
            label: 'underline text-green-tertiary',
          }"
          @click="toggleModalLayers"
        />
        <Button
          :disabled="!pauseInfo.reasonPaused"
          :label="$t(`${textData.section}cancelButton`)"
          :pt="{
            root: ({ context }) => ({
              class: [{ 'opacity-60 cursor-not-allowed': context.disabled }],
            }),
            label: 'underline text-green-tertiary',
          }"
          @click="closeModal"
        />
      </div>
      <Button
        :label="t(`${textData.section}title`)"
        :pt="{
          root: 'bg-orange-primary rounded-lg py-2 w-full mb-5 hover:bg-green-tertiary hover:text-orange-primary',
        }"
        @click="pauseSubscription"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import type { CalendarDate } from '~/components/admin/my-subscriptions/types/CalendarDate.ts'

const { t } = useI18n()
defineProps<{
  isVisible: boolean
}>()
const localePath = useLocalePath()
const { dateBuilder } = useDateBuilder()
const emit = defineEmits(['close-modal', 'pause-subscription'])
const closeModal = () => {
  emit('close-modal')
  resetPauseInfo()
  modalLayersDisplayed.pauseInfoModal = true
  modalLayersDisplayed.pauseDatepickerModal = false
}
const textData = {
  section: 'subscriptions.subscription.pause.modal.',
  options: 5,
}
const pauseInfo = reactive<PauseSubscriptionPayload>({
  reasonPaused: '',
  reasonPausedText: '',
  nextDeliveryDate: '',
})
const modalLayersDisplayed = reactive({
  pauseInfoModal: false,
  pauseDatepickerModal: true,
})
const resetPauseInfo = () => {
  pauseInfo.reasonPaused = ''
  pauseInfo.reasonPausedText = ''
}
const generateDropdownOptions = computed(() => {
  const options = []
  for (let i = 0; i < textData.options; i++) {
    options.push({
      value: t(`${textData.section}option_${i}.value`),
      label: t(`${textData.section}option_${i}.label`),
    })
  }
  return options
})
const toggleModalLayers = () => {
  modalLayersDisplayed.pauseInfoModal = !modalLayersDisplayed.pauseInfoModal
  modalLayersDisplayed.pauseDatepickerModal = !modalLayersDisplayed.pauseDatepickerModal
}

const isNextDeliveryDateSelected = (date: CalendarDate) => {
  console.log('date', date)
  const result = dateBuilder(date) === dayjs(pauseInfo.nextDeliveryDate).format('YYYY-MM-DD')
  console.log(dateBuilder(date))
  console.log(dayjs(pauseInfo.nextDeliveryDate).subtract(1, 'month').format('YYYY-MM-DD'))
  console.log('result', result)
  return result
}
const pauseSubscription = () => {
  emit('pause-subscription', pauseInfo)
  resetPauseInfo()
}

export type PauseSubscriptionPayload = {
  reasonPaused: string
  reasonPausedText: string
  nextDeliveryDate: string
}
</script>
