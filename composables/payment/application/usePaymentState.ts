import type { Payment } from '~/composables/payment/domain/Payment.ts'

export const usePaymentState = () => {
  const payments: Ref<Payment[]> = useState('payments', () => [])

  return {
    payments,
  }
}
