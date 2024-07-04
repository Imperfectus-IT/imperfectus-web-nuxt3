<template>
  <Dialog
    :visible="isVisible"
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
    <div class="text-center">
      <p class="mb-2">
        {{ $t(`${textData.section}paragraph_1`) }}
      </p>
      <NuxtLink
        :to="localePath({ name: 'admin-subscriptions-upcoming_orders-id' })"
      >
        <Button
          class="w-full lg:mt-0 lg:w-3/4"
          :label="$t(`${textData.section}upcomingButton`)"
        />
      </NuxtLink>
      <p class="mt-6">
        {{ $t(`${textData.section}paragraph_2`) }}
      </p>
      <Dropdown
        v-model="cancelInfo.reason"
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
          wrapper: 'max-w-[100vw] !h-[200px] overflow-auto',
          list: 'mx-auto',
        }"
      />
      <Textarea
        v-if="cancelInfo.reason === 'other'"
        v-model="cancelInfo.text"
        rows="4"
        :placeholder="$t(`${textData.section}placeholder`)"
        :pt="{
          root: 'border-[1px] border-green-tertiary bg-transparent px-4 py-3 rounded-lg w-full mb-4 outline-none',
        }"
        class="!w-3/4 mt-3 "
      />
      <div class="mt-5 flex flex-col gap-4 mb-6 ">
        <Button
          :disabled="!cancelInfo.reason"
          :label="$t(`${textData.section}cancelButton`)"
          :pt="{
            root: ({ context }) => ({
              class: [{ 'opacity-60 cursor-not-allowed': context.disabled }, 'bg-red-secondary py-3 rounded-lg lg:w-3/4 lg:mx-auto'],
            }),
          }"
          @click="closeModal"
        />
        <Button
          :label="$t(`${textData.section}closeButton`)"
          :pt="{
            root: ({ context }) => ({
              class: [{ 'opacity-60 cursor-not-allowed': context.disabled }],
            }),
            label: 'underline text-green-tertiary',
          }"
          @click="closeModal"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  isVisible: boolean
}>()
const { t } = useI18n()
const localePath = useLocalePath()
const emit = defineEmits(['close-modal', 'cancel-subscription'])
const closeModal = () => {
  emit('close-modal')
  resetCancelInfo()
}
const textData = {
  section: 'subscriptions.subscription.cancel.modal.',
  options: 7,
}

const cancelInfo = reactive({
  reason: '',
  text: '',
})
const resetCancelInfo = () => {
  cancelInfo.reason = ''
  cancelInfo.text = ''
}

const generateDropdownOptions = computed(() => {
  const options = []
  for (let i = 0; i < textData.options; i++) {
    options.push({
      value: t(`${textData.section}option_${i}.value`),
      label: t(`${textData.section}option_${i}.label`),
    })
  }
  console.log('OPTIONS', options)
  return options
})
</script>
