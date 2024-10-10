import { z } from 'zod'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useValidateResetPassword = () => {
  const { t } = useI18n()

  const resetPasswordFormSchema = z
    .object({
      code: z.string().length(6),
      email: z.string().email(),
      password: z
        .string()
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
          t('registerForm.validationPasswordErrorMessage'),
        ),
      confirmPassword: z.string().min(1),
    })
    .refine(values => values.password === values.confirmPassword, {
      message: t('string.forms.validation.confirm_password_no_match'),
      path: ['confirmPassword'],
    })

  type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>
  const validationErrorsResetPassword
    = ref<z.ZodFormattedError<ResetPasswordFormSchema> | null>(null)

  const validateSchemaResetPassword = (data: ResetPasswordFormSchema) => {
    const validSchema = resetPasswordFormSchema.safeParse(data)

    if (!validSchema.success) {
      validationErrorsResetPassword.value = validSchema.error.format()
    }
    else {
      validationErrorsResetPassword.value = null
    }
  }

  return {
    validationErrorsResetPassword,
    validateSchemaResetPassword,
  }
}
