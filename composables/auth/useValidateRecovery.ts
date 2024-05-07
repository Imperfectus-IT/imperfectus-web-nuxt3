import { z } from 'zod'
import { ref } from 'vue'

export const useValidateRecovery = () => {
  const recoveryFormSchema = z
    .object({
      email: z.string().email().min(1),
    })
    .required()
  type RecoveryFormSchema = z.infer<typeof recoveryFormSchema>
  const validationErrors = ref<z.ZodFormattedError<RecoveryFormSchema> | null>(
    null,
  )

  const validateSchema = (data: RecoveryFormSchema) => {
    console.info('test...')
    const validSchema = recoveryFormSchema.safeParse(data)

    if (!validSchema.success) {
      validationErrors.value = validSchema.error.format()
    }
    else {
      validationErrors.value = null
    }
  }

  return { validationErrors, validateSchema }
}
