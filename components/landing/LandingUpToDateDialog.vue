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
      header="Tarjeta de credito caducara pronto"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <p>
        Tu tarjeta de crédito terminada en XXXX caducará a finales de este mes.
        Para mantener tu suscripción activa, por favor actualiza tu información
        de facturación.
      </p>
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
defineProps({
  buttonDisabled: Boolean
})

</script>
