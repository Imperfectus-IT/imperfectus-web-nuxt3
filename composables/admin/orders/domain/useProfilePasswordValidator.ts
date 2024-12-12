import { z } from 'zod'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useProfilePasswordValidator = () => {
  const { t } = useI18n()

  const profilePasswordFormSchema = z
    .object({
      currentPassword: z.string().min(1, t('profileForm.validationCurrentPasswordRequired')),
      newPassword: z
        .string()
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
          t('profileForm.validationPasswordErrorMessage'),
        ),
      confirmPassword: z.string().min(1),
    })
    .refine(values => values.newPassword === values.confirmPassword, {
      message: t('string.forms.validation.confirm_password_no_match'),
      path: ['confirmPassword'],
    })

  type ProfilePasswordFormSchema = z.infer<typeof profilePasswordFormSchema>
  const validationErrorsProfilePassword
    = ref<z.ZodFormattedError<ProfilePasswordFormSchema> | null>(null)

  const validateSchemaProfilePassword = (data: ProfilePasswordFormSchema) => {
    const validSchema = profilePasswordFormSchema.safeParse(data)

    if (!validSchema.success) {
      validationErrorsProfilePassword.value = validSchema.error.format()
    }
    else {
      validationErrorsProfilePassword.value = null
    }
  }

  return {
    validationErrorsProfilePassword,
    validateSchemaProfilePassword,
  }
}
