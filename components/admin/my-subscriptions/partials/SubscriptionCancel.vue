<template>
  <Panel>
    <h4 class="text-[28px] font-recoleta-medium mx-auto">
      {{ $t(`${textData.section}title`) }}
    </h4>
    <p class="text-[18px] mt-4 leading-6 lg:mt-10">
      {{ $t(`${textData.section}description`) }}
    </p>
    <Button
      severity="success"
      class="mt-4 lg:mt-10"
      :pt="{
        root: 'bg-red-secondary py-3 border-[1px] rounded-lg hover:bg-green-tertiary hover:text-red-secondary',
      }"
      :label="$t(`${textData.section}button`)"
      @click="openModal"
    />
  </Panel>
</template>

<script setup lang="ts">
const emit = defineEmits(['open-cancel-modal'])
const textData = {
  section: 'subscriptions.subscription.cancel.',
}
const openModal = () => {
  emit('open-cancel-modal')
}
</script>
