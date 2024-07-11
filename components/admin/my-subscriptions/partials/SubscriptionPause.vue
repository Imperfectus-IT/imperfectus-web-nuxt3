<template>
  <Panel
    :header="$t(`${textData.section}title`)"
    :pt="{
      root: 'h-full border-[1px] rounded-lg flex flex-col pt-2 pb-3 gap-3',
      toggleableContent: 'h-full',
      content: 'h-full px-3 ',
      title: 'text-[28px] font-recoleta-medium text-center',
      header: 'text-center',
    }"
  >
    <div
      v-if="subscription.status === 'active'"
      class="flex flex-col justify-center"
    >
      <p class="text-[18px] leading-6 lg:mb-6">
        {{ $t(`${textData.section}description`) }}
      </p>
      <Button
        severity="success"
        class="mt-4 w-full lg:mt-auto lg:w-1/2 lg:mx-auto"
        :label="$t(`${textData.section}pauseButton`)"
        @click="openModal"
      />
    </div>
    <div
      v-else-if="subscription.status === 'paused'"
      class="flex flex-col justify-center"
    >
      <p class="text-[18px] mt-4 leading-6 lg:mt-0">
        {{ $t(`${textData.section}paused_description_1`) }}
      </p>
      <p class="text-[18px] leading-6 lg:mb-6">
        {{ $t(`${textData.section}paused_description_2`, { date: displayFormattedDate }) }}
      </p>
      <Button
        primary
        class="mt-4 w-full lg:w-1/2 lg:mx-auto lg:mt-auto"
        :label="$t(`${textData.section}unpauseButton`)"
        @click="unPauseSubscription"
      />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { Subscription } from '~/composables/admin/subscriptions/types/SubscriptionTypes.ts'

const props = defineProps<{
  subscription: Subscription
}>()
const displayFormattedDate = computed(() => {
  return dayjs(props.subscription.nextDeliveryDateFromPaused).format('DD-MM-YYYY')
})
const emit = defineEmits(['open-pause-modal', 'unpause-subscription'])
const textData = {
  section: 'subscriptions.subscription.pause.',
}
const openModal = () => {
  emit('open-pause-modal')
}
const unPauseSubscription = () => {
  emit('unpause-subscription', props.subscription.id)
}
</script>
