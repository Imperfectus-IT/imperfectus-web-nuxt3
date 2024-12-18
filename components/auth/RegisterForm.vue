<script setup lang="ts">
const { validationErrors, validationErrorsRegisterResponse, validateSchema } = useValidateRegisterUser()
const { registerUser, handleRegisterUser } = useRegisterUserHandler()
const localePath = useLocalePath()
const displayErrors = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'user-registered'): void
}>()

watch(registerUser.value, (newValue) => {
  validateSchema(newValue)
})

const submitRegisterForm = async () => {
  displayErrors.value = true
  await handleRegisterUser()
  emit('user-registered')
}

const isButtonDisabled = computed(() => {
  return registerUser.value.talkualLegalBasis
    && (!registerUser.value.email?.length
      || !registerUser.value.confirmEmail?.length
      || !registerUser.value.password?.length
      || !registerUser.value.confirmPassword?.length)
})
</script>

<template>
  <section class="px-10 md:px-[28%] lg:px-[35%] 2xl:px-[40%]">
    <div class="mb-5 lg:mb-10 text-center">
      <slot name="backButton" />
      <span class="font-recoleta-regular text-lg font-normal">{{
        $t("pages.auth.register.title")
      }}</span>
    </div>
    <SocialButtons :google-label="$t('registerForm.buttonGoogleRegister')" />
    <div class="flex items-center text-center py-3 lg:py-8">
      <Divider class="w-[30%] md:w-[50%] lg:w-[35%] xl:w-[55%] 2xl:w-[65%] opacity-50" />
      <span class="text-[14px] text-green-tertiary/50 w-full lg:w-4/5">{{
        $t("socialProvider.registerWithEmail")
      }}</span>
      <Divider class="w-[30%] md:w-[50%] lg:w-[35%] xl:w-[55%] 2xl:w-[65%] opacity-50" />
    </div>
    <form
      class="flex flex-col gap-y-4 lg:gap-y-8"
      @submit.prevent="submitRegisterForm"
    >
      <div>
        <InputText
          id="email"
          v-model.trim="registerUser.email"
          class="rounded-xl w-full"
          type="text"
          :placeholder="$t('registerForm.email')"
          :invalid="!!validationErrors?.email?._errors?.length && displayErrors"
        />
        <TKField
          v-if="displayErrors"
          :errors="validationErrors?.email?._errors"
        />
      </div>
      <div>
        <InputText
          id="confirmEmail"
          v-model.trim="registerUser.confirmEmail"
          class="rounded-xl w-full"
          type="text"
          :placeholder="$t('registerForm.confirmEmail')"
          :invalid="!!validationErrors?.confirmEmail?._errors?.length && displayErrors"
        />
        <TKField
          v-if="displayErrors"
          :errors="validationErrors?.confirmEmail?._errors"
        />
      </div>
      <div>
        <Password
          id="password"
          v-model="registerUser.password"
          class="w-full"
          type="password"
          :toggle-mask="true"
          :feedback="false"
          :placeholder="$t('registerForm.password')"
          :invalid="!!validationErrors?.password?._errors?.length && displayErrors"
        />
        <TKField
          v-if="displayErrors"
          :errors="validationErrors?.password?._errors"
        />
      </div>
      <div>
        <Password
          id="confirmPassword"
          v-model="registerUser.confirmPassword"
          class="w-full"
          type="password"
          :toggle-mask="true"
          :feedback="false"
          :placeholder="$t('registerForm.confirmPassword')"
          :invalid="!!validationErrors?.confirmPassword?._errors?.length && displayErrors"
        />
        <TKField
          v-if="displayErrors"
          :errors="validationErrors?.password?._errors"
        />
      </div>
      <div class="flex flex-row gap-3">
        <Checkbox
          v-model="registerUser.talkualLegalBasis"
          class="basis-7"
          input-id="talkualLegalBasis"
          name="talkualLegalBasis"
          :binary="true"
          true-value="freelyGivenConsentFromContact"
          false-value=""
        />
        <label
          for="talkualLegalBasis"
          class="basis-3/4 lg:basis-full text-xs lg:text-base font-normal leading-4 lg:leading-5"
        >
          {{ $t('pages.auth.register.legalTerms_1') }}
          <NuxtLinkLocale
            class="text-blue-primary hover:text-green-tertiary"
            to="/terminos-y-condiciones"
          >
            {{ $t('pages.auth.register.legalTerms_2_link') }}
          </NuxtLinkLocale>
          {{ $t('pages.auth.register.legalTerms_3') }}
          <NuxtLinkLocale
            class="text-blue-primary hover:text-green-tertiary"
            to="/politica-de-privacidad"
          >
            {{ $t('pages.auth.register.legalTerms_4_link') }}
          </NuxtLinkLocale>
          {{ $t('pages.auth.register.legalTerms_5') }}
        </label>
      </div>
      <div class="flex flex-row gap-4">
        <Checkbox
          v-model="registerUser.marketingInfoComm"
          class="basis-7"
          input-id="marketingInfoComm"
          name="marketingInfoComm"
          :binary="true"
          true-value="yes"
          false-value="no"
        />
        <label
          for="marketingInfoComm"
          class="basis-3/4 lg:basis-full text-xs lg:text-base font-normal leading-4 lg:leading-5"
        >{{ $t('gdpr.receive-communications') }}</label>
      </div>
      <div class="text-center">
        <Button
          class="w-full lg:w-[9rem]"
          :label="$t('registerForm.submit')"
          severity="secondary"
          type="submit"
          :disabled="isButtonDisabled"
        />
        <Message
          v-if="validationErrorsRegisterResponse.length"
          severity="error"
        >
          <p
            v-for="error in validationErrorsRegisterResponse"
            :key="error"
          >
            {{ error }}
          </p>
        </Message>
      </div>
      <NuxtLink
        class="font-solina-extended-medium text-center"
        :to="localePath({ name: 'auth-login' })"
      >
        <Button
          :label="$t('orderStepAuth.hasAccount')"
          :pt="{
            root: { class: 'px-0 py-0' },
            label: { class: 'text-base underline' },
          }"
          @click.prevent="$emit('authFormRequested', 'login')"
        />
      </NuxtLink>
    </form>
  </section>
</template>
