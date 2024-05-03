import { z } from 'zod'
import { ref } from 'vue'

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

    if (!validSchema.success) {
      validationErrors.value = validSchema.error.format()
    }
    else {
      validationErrors.value = null
    }
  }

  return { validationErrors, validateSchema }
}
