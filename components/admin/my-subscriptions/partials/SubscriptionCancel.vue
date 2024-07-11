<template>
  <Panel
    :header="getHeaderByState"
    :pt="{
      root: 'h-full border-[1px] rounded-lg flex flex-col pt-2 pb-3 gap-3',
      toggleableContent: 'h-full',
      content: 'h-full px-3',
      title: 'text-[28px] font-recoleta-medium text-center',
      header: 'text-center',
    }"
    :class="isSubscriptionCancelledStyle"
  >
    <div
      v-if="subscription.status !== 'cancelled'"
      class="flex flex-col justify-center lg:h-full"
    >
      <p class="text-[18px] leading-6 ">
        {{ $t(`${textData.section}description`) }}
      </p>
      <Button
        v-if="subscription.status !== 'cancelled'"
        severity="success"
        class="mt-4 w-full lg:w-1/2 lg:mt-auto lg:mx-auto"
        :pt="{
          root: 'bg-red-secondary py-3 border-[1px] rounded-lg hover:bg-green-tertiary hover:text-red-secondary lg:mt-auto ',
        }"
        :label="$t(`${textData.section}button`)"
        @click="openModal"
      />
    </div>
    <div
      v-if="subscription.status === 'cancelled'"
      class="flex flex-col items-center justify-center"
    >
      <p class="text-[18px] leading-6">
        {{ $t(`${textData.section}cancelledDescription1`) }}
      </p>
      <p class="text-[18px] leading-6 text-center">
        {{ $t(`${textData.section}cancelledDescription2`) }}
        <span class="font-bold">{{ $t(`${textData.section}cancelledDescription3`) }}</span>
      </p>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
  subscription: Subscription
}>()
const isSubscriptionCancelledStyle = computed(() => props.subscription.status === 'cancelled' ? 'bg-red-secondary' : '')
const getHeaderByState = computed(() => props.subscription.status === 'cancelled' ? t(`${textData.section}cancelledTitle`) : t(`${textData.section}title`))
const emit = defineEmits(['open-cancel-modal'])
const textData = {
  section: 'subscriptions.subscription.cancel.',
}
const openModal = () => {
  emit('open-cancel-modal')
}
</script>
