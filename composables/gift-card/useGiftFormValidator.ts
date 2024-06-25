import { z } from 'zod'
import type { GiftCardForm } from '~/components/gift-card/types/types'

export const useGiftFormValidator = () => {
  const giftCardForm = z
    .object({
      quantity: z.number(),
      message: z.string().min(10),
      whoSend: z.string().min(3),
      forWho: z.string().min(3),
      sendMethod: z.string().email({ message: 'Email incorrecto' }).min(1),
    })
    .required()

  const validationErrors = ref<z.ZodFormattedError<FormData> | null>(
    null,
  )

  const validateSchema = (data: GiftCardForm) => {
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