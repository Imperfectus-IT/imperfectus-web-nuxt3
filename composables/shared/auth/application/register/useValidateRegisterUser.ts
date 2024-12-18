import { z } from 'zod'

export const useValidateRegisterUser = () => {
  const { t } = useI18n()
  const registerFormSchema = z
    .object({
      email: z
        .string()
        .email(t('validations.email'))
        .min(6, t('validations.minLength', { min: 6 })),

      confirmEmail: z
        .string()
        .email(t('validations.email'))
        .min(6, t('validations.minLength', { min: 6 })),

      password: z
        .string()
        .min(8, t('validations.minLength', { min: 8 }))
        .max(64, t('validations.maxLength', { max: 64 }))
        .regex(/[A-Z]/, t('validations.oneCaps'))
        .regex(/[a-z]/, t('validations.oneLowerCase'))
        .regex(/[0-9]/, t('validations.oneNumber'))
        .regex(
          /[@$!%*?&]/,
          t('validations.oneSpecialCharacter') + ' (@, $, !, %, *, ?, &).',
        ),

      confirmPassword: z
        .string()
        .min(8, t('validations.minLength', { min: 8 }))
        .max(64, t('validations.maxLength', { max: 64 }))
        .regex(/[A-Z]/, t('validations.oneCaps'))
        .regex(/[a-z]/, t('validations.oneLowerCase'))
        .regex(/[0-9]/, t('validations.oneNumber'))
        .regex(
          /[@$!%*?&]/,
          t('validations.oneSpecialCharacter') + ' (@, $, !, %, *, ?, &).',
        ),
    })
    .refine(data => data.email === data.confirmEmail, {
      message: t('validations.emailsMatch'),
      path: ['confirmEmail'],
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('validations.passwordsMatch'),
      path: ['confirmPassword'],
    })

  type RegisterFormSchema = z.infer<typeof registerFormSchema>

  const validationErrors = ref<z.ZodFormattedError<RegisterFormSchema> | null>(
    null,
  )

  const validateSchema = (data: Partial<RegisterFormSchema>) => {
    const validSchema = registerFormSchema.safeParse(data)
    setValidationErrorsRegisterResponse([])

    if (!validSchema.success) {
      validationErrors.value = validSchema.error.format()
    }
    else {
      validationErrors.value = null
    }
  }

  const validationErrorsRegisterResponse = useState('validationErrorsRegisterResponse', () => [])
  const setValidationErrorsRegisterResponse = (err: any) => {
    validationErrorsRegisterResponse.value = err?.message?.length ? err?.message?.map((error: any) => error.messages?.map((item: any) => item.message)).flat() : []
  }

  return { validationErrors, validationErrorsRegisterResponse, setValidationErrorsRegisterResponse, validateSchema }
}
