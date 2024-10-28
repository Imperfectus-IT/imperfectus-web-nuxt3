import { z } from 'zod'

export const useValidateShippingForm = () => {
  const errors = ref<z.ZodFormattedError<FormData> | null>(null)
  const shippingSchema = z.object({
    firstname: z.string().min(1, 'El nombre es obligatorio'),
    lastname: z.string().min(1, 'El apellido es obligatorio'),
    email: z.string().email('El correo electrónico no es válido'),
    phone: z.string().optional(),
    company: z.string().optional(),
    address1: z.string().min(1, 'La dirección es obligatoria'),
    address2: z.string().optional(),
    postalCode: z.string().min(1, 'El código postal es obligatorio'),
    city: z.string().min(1, 'La ciudad es obligatoria'),
    state: z.string().optional(),
    country: z.string().min(1, 'El país es obligatorio'),
    notes: z.string().optional(),
  })

  const validateSchema = (data: FormData) => {}
}
