import { z } from 'zod'

export const useValidateRegisterUser = () => {
  const registerFormSchema = z
    .object({
      email: z.string().email().min(6),
      confirmEmail: z.string().email().min(6),
      password: z.string().min(1),
      confirmPassword: z.string().min(1),
    })
    .required()
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
