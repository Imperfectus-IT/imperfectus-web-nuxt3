<script setup lang="ts">
const { t } = useI18n()
const { validationErrorsProfilePassword, validateSchemaProfilePassword } = useProfilePasswordValidator()
const { updatePassword } = useUpdatePassword()
const emits = defineEmits(['on-cancel', 'on-modify-password'])
const props = defineProps<{
  email: string
}>()

const form = ref({
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
})

const handleSubmit = async () => {
  validateSchemaProfilePassword({
    currentPassword: form.value.currentPassword,
    newPassword: form.value.newPassword,
    confirmPassword: form.value.newPasswordConfirmation,
  })

  if (!validationErrorsProfilePassword.value) {
    await updatePassword(
      form.value.currentPassword,
      form.value.newPassword,
      form.value.newPasswordConfirmation,
      props.email,
    )
    resetForm()
    emits('on-modify-password')
  }
}

const handleCancel = () => {
  resetForm()
  emits('on-cancel')
}

const resetForm = () => {
  form.value.currentPassword = ''
  form.value.newPassword = ''
  form.value.newPasswordConfirmation = ''
}

const getFirstError = (errors) => {
  return errors?._errors ? errors._errors[0] : null
}
</script>

<template>
  <Panel
    :header="t('adminProfileForm.title')"
    class="lg:w-full"
    :pt="{
      title: 'font-recoleta-medium text-xl font-medium leading-5 lg:-mb-5',
    }"
  >
    <Divider class="lg:invisible" />
    <div>
      <div class="flex flex-col gap-2 mt-6">
        <label for="currentPassword">{{ t('adminProfileForm.currentPassword') }}</label>
        <TKField :errors="[getFirstError(validationErrorsProfilePassword?.currentPassword)]">
          <Password
            id="currentPassword"
            v-model="form.currentPassword"
            class="rounded-md"
            aria-describedby="currentPassword"
            :toggle-mask="true"
          />
        </TKField>
      </div>

      <div class="flex flex-col gap-2 mt-6">
        <label for="newPassword">{{ t('adminProfileForm.newPassword') }}</label>
        <TKField :errors="[getFirstError(validationErrorsProfilePassword?.newPassword)]">
          <Password
            id="newPassword"
            v-model="form.newPassword"
            class="rounded-md"
            aria-describedby="newPassword"
            :toggle-mask="true"
          />
        </TKField>
      </div>

      <div class="flex flex-col gap-2 mt-6">
        <label for="newPasswordConfirmation">{{ t('adminProfileForm.newPasswordConfirmation') }}</label>
        <TKField :errors="[getFirstError(validationErrorsProfilePassword?.confirmPassword)]">
          <Password
            id="newPasswordConfirmation"
            v-model="form.newPasswordConfirmation"
            class="rounded-md"
            aria-describedby="newPasswordConfirmation"
            :toggle-mask="true"
          />
        </TKField>
      </div>

      <div class="flex flex-col gap-3 lg:flex-row lg:justify-around lg:align-items-end lg:mt-10">
        <Button
          class="w-[11.5rem] h-[3.125rem]"
          :label="t('profile.personal_data.cancel_changes_button')"
          :pt="{ label: 'text-md' }"
          outlined
          @click="handleSubmit"
        >
          {{ t('profile.password.save_changes_button') }}
        </Button>

        <Button
          class="w-[11.5rem] h-[3.125rem]"
          :label="t('profile.personal_data.cancel_button')"
          :pt="{ label: 'text-md' }"
          outlined
          @click="handleCancel"
        >
          {{ t('profile.password.cancel_changes_button') }}
        </Button>
      </div>
    </div>
  </Panel>
</template>

<style scoped lang="scss">

</style>
