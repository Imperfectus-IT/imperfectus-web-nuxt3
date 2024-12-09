<script setup lang="ts">
defineProps<{
  isVisible: boolean
  title: string
}>()

const emit = defineEmits(['close', 'next'])
</script>

<template>
  <Dialog
    :visible="isVisible"
    modal
    :closable="false"
    :dismissable-mask="true"
    :header="title"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :pt="{
      root: 'bg-beige-primary rounded-lg text-green-tertiary lg:w-[800px] lg:px-28 lg:py-10',
      header: 'font-recoleta-regular text-green-tertiary text-center py-4',
      title: 'text-[30px]',
      content: '',
    }"
    class="flex w-full items-center justify-center px-6"
  >
    <div class="flex flex-col items-center gap-4">
      <div class="flex items-center justify-center gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM10 0C4.47 0 0 4.5 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
            fill="#E45126"
          />
        </svg>
        <strong>{{ $t('adminSubscriptionIsSundayModal.subtitle.bold') }}</strong>
      </div>

      <div class="mt-2 flex flex-wrap justify-center w-[300px]">
        <span>
          {{ $t('adminSubscriptionIsSundayPauseModal.description.1') }}
          <strong>
            {{ $t('adminSubscriptionIsSundayPauseModal.description.2.bold') }}
          </strong>
        </span>
      </div>

      <div class="my-5 mt-4 flex gap-16 md:my-2">
        <button
          class="btn btn-secondary"
          @click="emit('close')"
        >
          <p class="underline">
            {{ $t('cancelSubscriptionModal.close') }}
          </p>
        </button>
        <button
          class="btn btn-primary"
          @click="emit('next')"
        >
          <p class="underline">
            {{ $t('cancelSubscriptionModal.next') }}
          </p>
        </button>
      </div>
    </div>
  </Dialog>
</template>
