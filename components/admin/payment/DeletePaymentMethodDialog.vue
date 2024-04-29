<script setup lang="ts">
import dialogPanelStyles from '@/presets/talkual-ui/dialog/dialogPanelStyle.ts';
const { visible } = defineProps({
  visible: { type: Boolean, default: false }
})
</script>

<template>
  <Dialog
      :visible="visible"
      :closable="false"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :pt="dialogPanelStyles"
  >
    <template #header>
      <div class="w-full">
        <h3 class="font-recoleta-semibold text-xl font-medium leading-5">{{ $t('profile.payment.deleteModal.title') }}</h3>
        <Divider />
      </div>
    </template>
    <p>{{ $t('profile.payment.deleteModal.description') }}</p>
    <template #footer>
      <Button
          class="h-[3.125rem]"
          :label="$t('profile.payment.deleteModal.confirm')"
          severity="success"
          :pt="{ label: 'text-sm' }"
          @click.prevent="$emit('delete')"
      />
      <Button
          class="h-[3.125rem]"
          :label="$t('profile.payment.deleteModal.cancel')"
          :pt="{ label: 'text-sm' }" outlined
          @click.prevent="$emit('hide')"
      />
    </template>
  </Dialog>
</template>

