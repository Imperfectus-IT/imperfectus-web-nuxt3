<template>
  <div
    class="bg-green-quaternary mt-16 flex flex-col items-center justify-center text-center px-1"
  >
    <h2 class="mt-10 font-recoleta-regular text-[35px]">
      {{ $t('homeUpToDate.title') }}
    </h2>
    <p class="text-[18px] mt-2">
      {{ $t('homeUpToDate.description') }}
    </p>
   
    <!-- FALTA EL MODAL -->
        
    <div
      v-if="!form.displayMessageSent"
      id="form-newsletter-home"
      class="HomeUpToDate__email is-flex is-flex-direction-column is-align-items-center mb-6"
    >
      <InputText
        v-model="form.email"
        class="rounded-none border-0 border-b border-green-tertirary mt-10"
        type="text"
        placeholder="Tu email"
        :pt="{label: 'text-[18px]'}"
        @input="displaySecondInput"
      />

      <InputText
        v-if="form.emailFocused"
        v-model="form.confirmEmail"
        class="rounded-none border-0 border-b border-green-tertirary mt-4"
        type="text"
        placeholder="Tu email"
        :pt="{label: 'text-[18px]'}"
      />

      <Button
        class="mt-10 mb-4 !px-4"
        :label="$t('homeUpToDate.subscribe')"
        raised
        :pt="{label: 'px-10 py-1'}"
        :disabled="!emailIsMatched"
        @click="displayGDPRModal"
      />
    </div>
    <div v-else>
      <p class="my-4">
        {{ $t('homeUpToDate.messageSent') }}
      </p>
    </div>  
  </div>
</template>

<script setup lang="ts">

const showGDPRModal = ref(false);
const form = reactive({
    email: null,
    confirmEmail: null,
    emailFocused: false,
    displayMessageSent: false
})


const emailIsMatched = computed(() => {
    return form.email === form.confirmEmail && form.email !== null && form.confirmEmail !== null;
})

const displayGDPRModal = () => {
    showGDPRModal.value = true;
}

const closeGDPRModal = () => {
    showGDPRModal.value = false;
}

const displaySecondInput = () => {
    form.emailFocused = true;
}

const submitForm = () => {
    console.log('submitForm')
    form.email = null;
    form.confirmEmail = null;
}



</script>