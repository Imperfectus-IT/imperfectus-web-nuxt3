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
   
    
    <div
      v-if="!form.displayMessageSent"
      id="form-newsletter-home"
      class="mb-6 flex flex-col items-center justify-center"
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
        placeholder="Repite tu email"
        :pt="{label: 'text-[18px]'}"
      />
      
      <LandingUpToDateDialog 
        class="mt-10 mb-4"
        :button-disabled="!emailIsMatched"
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
    email: '',
    confirmEmail: '',
    emailFocused: false,
    displayMessageSent: false
})


const emailIsMatched = computed(() => {
    return form.email === form.confirmEmail && form.email !== '' && form.confirmEmail !== '';
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
    form.email = '';
    form.confirmEmail = '';
}



</script>