<template>
  <div class="flex justify-center">
    <Button
      :label="$t('homeUpToDate.subscribe')"
      raised
      :pt="{ label: 'px-10 py-1' }"
      :disabled="buttonDisabled"
      @click="visible = true"
    />
    <Dialog
      class="flex"
      :visible="visible"
      modal
      :closable="false"
      :dismissable-mask="true"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :pt="{ root: { class: 'bg-green-quaternary' },
      }"
    >
      <div class="flex justify-start items-center">
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
          :label="t('homeUpToDate.confirm')"
          :disabled="!checked"
          raised
          :pt="{
            root: ({ context }) => ({
              class: [
                'bg-green-primary hover:bg-green-primary p-3 rounded-lg',
                { 'cursor-not-allowed opacity-50': context.disabled },
              ],
            }),
            label: 'text-md text-green-tertiary',
          }"
          @click="subscribe"
        />
        <Button
          :label="t('homeUpToDate.cancel')"
          outlined
          :pt="{
            root: {
              class: 'border border-green-primary p-3 rounded-lg',
            },
            label: 'text-md text-green-tertiary',
          }"
          @click="visible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  buttonDisabled: Boolean,
})
const emits = defineEmits(['subscribe'])
const { t } = useI18n()
const visible = ref(false)
const checked = ref(false)
const subscribe = () => {
  if (checked.value) {
    emits('subscribe')
    visible.value = false
    checked.value = false
  }
}
</script>
