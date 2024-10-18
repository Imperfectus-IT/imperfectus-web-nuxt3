import { useFormPaymentState } from '~/composables/payment/useFormPaymentState.ts'
import { useFormPayment } from '~/composables/payment/form/useFormPayment.ts'

export const useFormPaymentHandler = () => {
  const { url, body } = useFormPaymentState()
  const { executeFormPayment } = useFormPayment()

  const formPaymentHandler = async (id: number) => {
    await executeFormPayment(id)
  }

  return {
    url,
    body,
    formPaymentHandler,
  }
}
