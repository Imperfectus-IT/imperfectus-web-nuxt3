import { z } from 'zod'

export const useValidateLogin = () => {
  const loginFormSchema = z
    .object({
      identifier: z.string().email().min(6),
      password: z.string().min(1),
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
    validationErrorsLoginResponse.value = err?.message?.length ? err?.message.map((error: any) => error.messages.map((item: any) => item.message)).flat() : []
  }

  return { validationErrors, validationErrorsLoginResponse, setValidationErrorsLoginResponse, validateSchema }
}
