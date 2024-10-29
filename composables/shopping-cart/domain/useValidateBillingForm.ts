import { z } from 'zod'

export const useValidateBillingForm = () => {
  const errors = ref<z.ZodFormattedError<FormData> | null>(null)
  const billingSchema = z.object({
    billingFirstName: z.string().min(2, 'El nombre es obligatorio'),
    billingLastName: z.string().min(2, 'El apellido es obligatorio'),
    billingEmail: z.string().email('El correo electrónico no es válido'),
    billingPhone: z.string().optional().refine(val => !val || val.length === 9, {
      message: 'El teléfono debe tener 9 dígitos',
    }),
    billingCif: z.string().regex(/(^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$)|(^\d{8}[A-Z]$)/, 'El CIF o NIF no es válido'),
    billingAddress: z.string().min(6, 'La dirección es obligatoria'),
    billingPostCode: z.string().regex(/^\d{5}$/, 'El código postal debe tener 5 dígitos'),
    billingCity: z.string().min(1, 'La ciudad es obligatoria'),
    billingState: z.string().min(1, 'La provincia es obligatoria'),
    billingCountry: z.string().min(1, 'El país es obligatorio'),
    billingNotes: z.string().optional(),
    billingCompany: z.string().optional(),
    billingSocialName: z.string().optional(),
  })

  const validateSchema = (data: FormData) => {
    console.log(data)
    const validSchema = billingSchema.safeParse(data)

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
