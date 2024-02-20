<template>
  <div class="flex justify-center">
    <Button
      :label="$t('homeUpToDate.subscribe')"
      raised
      :pt="{label: 'px-10 py-1'}"
      :disabled="buttonDisabled"
      @click="visible = true"
    />
    <Dialog
      :visible="visible"
      modal
      :closable="false"
      :dismissable-mask="true"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :pt="{ root: { class: 'bg-green-quaternary' },
      //  mask: { class: 'bg-[gray]' }
      }"
    >
      <div class="flex justify-center items-center">
        <Checkbox
          v-model="checked"
          input-id="checkbox"
          :binary="true"
        />
        <label
          class="text-green-tertiary ml-2"
          for="checkbox"
        >
          {{ $t('gdpr-modal.communications.label') }} 
        </label>
      </div>
      <div class="flex flex-row justify-center items-center">
        <Checkbox
          v-model="checked"
          class="min-w-5 max-h-5"
          input-id="checkbox"
          :binary="true"
        />
        <label
          class="text-green-tertiary ml-2"
          for="checkbox"
        >
          {{ $t('gdpr-modal.personal-data.label') }}
        </label>
      </div>

      <template #footer>
        <Button
          label="Actualizar tarjeta de credito"
          raised
          :pt="{
            root: {
              class:
                'bg-green-primary hover:bg-green-primary hover:text-green-primary p-2 rounded-lg',
            },
            label: 'text-xs text-green-tertiary',
          }"
        />
        <Button
          label="Mas tarde"
          outlined
          :pt="{
            root: {
              class: 'border border-green-primary p-2 rounded-lg',
            },
            label: 'text-xs text-green-primary',
          }"
          @click="visible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const checked = ref(false);
defineProps({
  buttonDisabled: Boolean
})
</script>
