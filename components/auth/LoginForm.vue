<script setup lang="ts">
const { validationErrors, validationErrorsLoginResponse, validateSchema } = useValidateLogin()
const { userLogin, handleLoginUser } = useLoginUserHandler()
const localePath = useLocalePath()

watch(userLogin.value, (newValue) => {
  validateSchema(newValue)
})
const emit = defineEmits<{
  (e: 'login'): void
  (e: 'authFormRequested'): void
}>()

const isButtonDisabled = computed(() => {
  return !userLogin.value.identifier?.length || !userLogin.value.password?.length
})

const submitLoginForm = async () => {
  try {
    await handleLoginUser()
    emit('login')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section class="px-10 md:px-[28%] lg:px-[35%] 2xl:px-[40%]">
    <div class="mb-5 lg:mb-10 text-center">
      <slot name="backButton" />
      <span class="font-recoleta-regular text-lg font-normal">{{
        $t("loginForm.login")
      }}</span>
    </div>
    <SocialButtons :google-label="$t('loginForm.buttonGoogleLogin')" />
    <div class="flex items-center text-center py-3 lg:py-8">
      <Divider class="w-[36%] md:w-[50%] lg:w-[35%] xl:w-[55%] 2xl:w-[65%] opacity-50" />
      <span class="text-[10px] text-green-tertiary/50 w-full lg:w-4/5">{{
        $t("socialProvider.loginWithEmail")
      }}</span>
      <Divider class="w-[36%] md:w-[50%] lg:w-[35%] xl:w-[55%] 2xl:w-[65%] opacity-50" />
    </div>
    <form
      class="flex flex-col gap-y-4 lg:gap-y-8"
      @submit.prevent="submitLoginForm"
    >
      <TKField :errors="validationErrors?.identifier?._errors">
        <InputText
          id="identifier"
          v-model="userLogin.identifier"
          class="rounded-xl"
          type="text"
          :placeholder="$t('loginForm.email')"
          :invalid="!!validationErrors?.identifier?._errors?.length"
        />
      </TKField>
      <TKField :errors="validationErrors?.password?._errors">
        <Password
          id="password"
          v-model="userLogin.password"
          type="password"
          :feedback="false"
          :placeholder="$t('loginForm.password')"
          :invalid="!!validationErrors?.password?._errors?.length"
        />
      </TKField>
      <div class="text-center">
        <Button
          class="w-full lg:w-[9rem]"
          :label="$t('loginForm.login')"
          severity="secondary"
          type="submit"
          :disabled="isButtonDisabled"
        />
        <Message
          v-if="validationErrorsLoginResponse.length"
          severity="error"
        >
          <p
            v-for="error in validationErrorsLoginResponse"
            :key="error"
          >
            {{ error }}
          </p>
        </Message>
      </div>
      <NuxtLink
        class="font-extended-book text-start lg:text-center"
        :to="localePath({ name: 'auth-recovery' })"
      >
        <Button
          :label="$t('loginForm.forgotPassword')"
          link
          :pt="{
            root: { class: 'px-0 py-0 lg:h-3' },
            label: { class: 'text-sm font-light underline' },
          }"
        />
      </NuxtLink>
      <Button
        class="font-solina-extended-medium text-center"
        :label="$t('orderStepAuth.hastAccount')"
        :pt="{
          root: { class: 'px-0 py-0' },
          label: { class: 'text-base underline' },
        }"
        @click.prevent="$emit('authFormRequested', 'register')"
      />
    </form>
  </section>
</template>
