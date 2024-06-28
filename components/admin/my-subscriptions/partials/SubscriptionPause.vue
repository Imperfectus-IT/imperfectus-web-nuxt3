<script setup lang="ts">
const textData = {
  section: 'subscriptions.subscription.pause.',
}
</script>

<template>
  <Panel>
    <h4 class="text-[28px] font-recoleta-medium mx-auto">
      {{ $t(`${textData.section}title`) }}
    </h4>
    <p class="text-[18px] mt-4 leading-6">
      {{ $t(`${textData.section}description`) }}
    </p>
    <Button
      severity="success"
      class="mt-4"
      :label="$t(`${textData.section}button`)"
    />
  </Panel>
</template>
