import { z } from 'zod'
import type { FormData } from '~/components/gift-card/types/types'

export const useGiftFormValidator = () => {
  const giftCardForm = z
    .object({
      quantity: z.string().min(1),
      message: z.string().min(10),
      sender: z.string().min(3),
      receiver: z.string().min(3),
      email: z.string().email({ message: 'Email incorrecto' }).min(1),
    })
    .required()

  const validationErrors = ref<z.ZodFormattedError<FormData> | null>(
    null,
  )

  const validateSchema = (data: FormData) => {
    const validSchema = giftCardForm.safeParse(data)
    if (!validSchema.success) {
      validationErrors.value = validSchema.error.format()
    }
    else {
      validationErrors.value = null
    }
  }

  return { validationErrors, validateSchema }
}
