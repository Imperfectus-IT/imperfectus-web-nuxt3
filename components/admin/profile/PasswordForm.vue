<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useProfilePasswordValidator } from '@/composables/admin/orders/domain/useProfilePasswordValidator'

const { t } = useI18n()
const toast = useToast()
const { successToast } = useToastService()
const { personalData } = useProfileState()
const { validationErrorsProfilePassword, validateSchemaProfilePassword } = useProfilePasswordValidator()
const { updatePassword } = useUpdatePassword()
const emits = defineEmits(['on-cancel', 'on-modify-password'])

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
    try {
      await updatePassword(
        form.value.currentPassword,
        form.value.newPassword,
        form.value.newPasswordConfirmation,
        personalData.value.email,
      )
      resetForm()
      emits('on-modify-password')

      successToast(
        toast,
        t('adminProfileForm.passwordUpdated'),
        t('adminProfileForm.passwordUpdatedSuccess'),
      )
    }
    catch (error) {
      console.error('Error updating password:', error)
      let errorMessage = t('adminProfileForm.dataUpdateError')
      if (error.data && error.data[0] && error.data[0].messages && error.data[0].messages[0]) {
        const errorCode = error.data[0].messages[0].id
        errorMessage = t(errorCode) || errorMessage
      }
      validationErrorsProfilePassword.value = {
        ...validationErrorsProfilePassword.value,
        _errors: [errorMessage],
      }
    }
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
  validationErrorsProfilePassword.value = null
}

const getErrors = (field) => {
  const fieldErrors = validationErrorsProfilePassword.value?.[field]?._errors || []
  const generalErrors = validationErrorsProfilePassword.value?._errors || []
  return field === 'currentPassword' ? [...fieldErrors, ...generalErrors] : fieldErrors
}
</script>

<template>
  <Panel
    :header="t('adminProfileForm.modifyPasswordTitle')"
    class="lg:w-full"
    :pt="{
      title: 'font-recoleta-medium text-xl font-medium leading-5 lg:-mb-5',
    }"
  >
    <Divider class="lg:invisible" />
    <form @submit.prevent="handleSubmit">
      <div>
        <div class="flex flex-col gap-2 mt-6">
          <label for="currentPassword">{{ t('adminProfileForm.currentPassword') }}</label>
          <TKField :errors="getErrors('currentPassword')">
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
          <TKField :errors="getErrors('newPassword')">
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
          <TKField :errors="getErrors('confirmPassword')">
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
            :label="t('profile.password.save_changes_button')"
            :pt="{ label: 'text-md' }"
            type="submit"
          />
          <Button
            class="w-[11.5rem] h-[3.125rem]"
            :label="t('profile.password.cancel_changes_button')"
            :pt="{ label: 'text-md' }"
            outlined
            @click="handleCancel"
          />
        </div>
      </div>
    </form>
  </Panel>
</template>

<style scoped lang="scss">

</style>
