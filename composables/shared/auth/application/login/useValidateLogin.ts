import { z } from 'zod'

export const useValidateLogin = () => {
  const { t } = useI18n()
  const loginFormSchema = z
    .object({
      identifier: z.string().email(t('validations.email')).min(6, t('validations.minLength', { min: 6 })),
      password: z
        .string()
        .min(8, t('validations.minLength', { min: 8 }))
        .max(64, t('validations.maxLength', { max: 64 }))
        .regex(/[A-Z]/, t('validations.oneCaps'))
        .regex(/[a-z]/, t('validations.oneLowerCase'))
        .regex(/[0-9]/, t('validations.oneNumber'))
        .regex(/[@$!%*?&]/, t('validations.oneSpecialCharacter') + ' (@, $, !, %, *, ?, &).'),
    })
    .required()
  type LoginFormSchema = z.infer<typeof loginFormSchema>
  const validationErrors = ref<z.ZodFormattedError<LoginFormSchema> | null>(
    null,
  )

  const validateSchema = (data: LoginFormSchema) => {
    const validSchema = loginFormSchema.safeParse(data)
    setValidationErrorsLoginResponse([])

    if (!validSchema.success) {
      validationErrors.value = validSchema.error.format()
    }
    else {
      validationErrors.value = null
    }
  }

  const validationErrorsLoginResponse = useState('validationErrorsLoginResponse', () => [])
  const setValidationErrorsLoginResponse = (err: any) => {
    validationErrorsLoginResponse.value = err?.message?.length
      ? err?.message?.map((error: any) => error.messages?.map((item: any) => {
        return t(item.id) ?? item.message
      }).flat()).flat()
      : []
  }

  return { validationErrors, validationErrorsLoginResponse, setValidationErrorsLoginResponse, validateSchema }
}
