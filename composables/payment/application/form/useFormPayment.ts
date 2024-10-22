import { useFormPaymentState } from '~/composables/payment/useFormPaymentState.ts'

export const useFormPayment = () => {
  const { url, body } = useFormPaymentState()
  const { form } = usePaymentRepository()

  const executeFormPayment = async (id: number) => {
    const paymentForm = await form(id)
    url.value = paymentForm.url
    body.value = paymentForm.body
  }

  return {
    url,
    body,
    executeFormPayment,
  }
}
