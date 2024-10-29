import { z } from 'zod'

export const useValidateShippingForm = () => {
  const errors = ref<z.ZodFormattedError<FormData> | null>(null)
  const shippingSchema = z.object({
    shippingFirstName: z.string().min(2, 'El nombre es obligatorio'),
    shippingLastName: z.string().min(2, 'El apellido es obligatorio'),
    shippingEmail: z.string().email('El correo electrónico no es válido'),
    shippingPhone: z.string().optional().refine(val => !val || val.length === 9, {
      message: 'El teléfono debe tener 9 dígitos',
    }),
    shippingAddress: z.string().min(6, 'La dirección es obligatoria'),
    shippingAddress2: z.string().optional(),
    shippingPostCode: z.string().regex(/^\d{5}$/, 'El código postal debe tener 5 dígitos'),
    shippingCity: z.string().min(1, 'La ciudad es obligatoria'),
    shippingState: z.string().min(1, 'La provincia es obligatoria'),
    shippingCountry: z.string().min(1, 'El país es obligatorio'),
    shippingNotes: z.string().optional(),
  })

  const validateSchema = (data: FormData) => {
    const validSchema = shippingSchema.safeParse(data)

    if (!validSchema.success) {
      errors.value = validSchema.error.format()
    }
    else {
      errors.value = null
    }
  }

  return {
    errors,
    validateSchema,
  }
}
