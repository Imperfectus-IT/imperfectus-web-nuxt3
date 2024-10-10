<script setup lang="ts">
import { z } from 'zod'
import { useValidateResetPassword } from '~/composables/shared/auth/domain/useValidateResetPassword.ts'

const { validationErrors, validateSchema } = useValidateRecovery()
const { recoveryFormData, handleRecovery, handleReset } = useStrapiRecovery()
const { validationErrorsResetPassword, validateSchemaResetPassword }
  = useValidateResetPassword()
const localePath = useLocalePath()

type stepType = 'email' | 'password'

const step = ref<stepType>('email')
const loading = ref(false)

const emit = defineEmits<{
  (e: 'recovery'): void
}>()

const submitRecoveryForm = async () => {
  try {
    loading.value = true
    validateSchema(recoveryFormData.value)

    if (!validationErrors.value) {
      const isOk = await handleRecovery()
      if (isOk) {
        step.value = 'password'
      }
    }
  }
  catch (err) {
    console.error('Error submitting recovery form:', err)
  }
  finally {
    loading.value = false
  }
}

const submitResetPasswordForm = async () => {
  try {
    loading.value = true
    validateSchemaResetPassword(recoveryFormData.value)

    if (!validationErrorsResetPassword.value) {
      await handleReset()
      emit('recovery')
    }
  }
  catch (err) {
    const errorAuthCode = err.data.find(
      item => item.messages[0].id === 'Auth.form.error.code.provide',
    )
    if (errorAuthCode) {
      const error = new z.ZodError([
        {
          message: errorAuthCode.messages[0].id,
          path: ['code'],
          code: z.ZodIssueCode.custom,
          params: { custom: 'Auth.form.error.code.provide' },
        },
      ])

      validationErrorsResetPassword.value = {
        ...validationErrorsResetPassword.code,
        code: error.errors.some(e => e.path.includes('code'))
          ? { _errors: ['Code is invalid'] }
          : undefined,
      }
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="px-10 md:px-[24%] lg:px-[30%] 2xl:px-[36%]">
    <slot name="header" />
    <transition
      name="fade"
      mode="out-in"
    >
      <form
        v-if="step === 'email'"
        key="email"
        class="flex flex-col gap-y-4 lg:gap-y-8"
        @submit.prevent="submitRecoveryForm"
      >
        <TKField :errors="validationErrors?.email?._errors">
          <InputText
            v-model="recoveryFormData.email"
            type="text"
            size="small"
            class="rounded-xl"
            :placeholder="$t('recoveryForm.email')"
            :invalid="!!validationErrors?.email?._errors?.length"
          />
        </TKField>
        <TKField>
          <Button
            class="w-full self-center lg:w-[9rem]"
            severity="secondary"
            type="submit"
            :loading="loading"
          >
            {{ $t("recoveryForm.submit") }}
          </Button>
        </TKField>
      </form>

      <div
        v-else-if="step === 'password'"
        key="password"
      >
        <p class="mt-2 mb-6">
          {{ $t("recoveryForm.successMessage") }}
        </p>

        <form
          class="flex flex-col gap-y-5"
          @submit.prevent="submitResetPasswordForm"
        >
          <TKField :errors="validationErrorsResetPassword?.code?._errors">
            <InputText
              id="code"
              v-model="recoveryFormData.code"
              type="text"
              size="small"
              class="rounded-xl"
              :placeholder="$t('recoveryForm.confirmationCode')"
            />
          </TKField>

          <TKField :errors="validationErrorsResetPassword?.email?._errors">
            <InputText
              id="email"
              v-model="recoveryFormData.email"
              type="text"
              size="small"
              class="rounded-xl"
              :placeholder="$t('recoveryForm.email')"
            />
          </TKField>

          <div class="flex flex-col gap-3 md:flex-row justify-between">
            <TKField
              class="flex-1"
              :errors="validationErrorsResetPassword?.password?._errors"
            >
              <Password
                id="mewPassword"
                v-model="recoveryFormData.password"
                class="w-full rounded-xl"
                :placeholder="$t('recoveryForm.newPassword')"
              />
            </TKField>

            <TKField
              class="flex-1"
              :errors="validationErrorsResetPassword?.confirmPassword?._errors"
            >
              <Password
                id="confirmNewPassword"
                v-model="recoveryFormData.confirmPassword"
                class="w-full"
                :placeholder="$t('recoveryForm.confirmNewPassword')"
              />
            </TKField>
          </div>

          <Button
            class="self-center w-auto pl-4 pr-4 mt-4"
            severity="secondary"
            type="submit"
            :loading="loading"
          >
            {{ $t("recoveryForm.recover") }}
          </Button>
        </form>
      </div>
    </transition>

    <div class="mt-2 font-extended-book">
      <nuxt-link :to="localePath('auth-login')">
        <small class="underline">{{ $t("recoveryForm.back") }}</small>
      </nuxt-link>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
