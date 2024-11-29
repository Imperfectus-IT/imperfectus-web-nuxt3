import type { Payment, PaymentForm } from '../domain/Payment.ts'

export const usePaymentRepository = () => {
  const client = useStrapiClient()

  const findPaymentsByUserId = async (id: number): Promise<Payment[]> => {
    const { find } = useStrapi()
    const userPayments = await find<Payment[]>('payments', { user: id })
    return userPayments.filter((payment: Payment) => payment.cardNumber)
  }
  const deletePayment = async (id: number): Promise<Payment> => {
    const { delete: _delete } = useStrapi()
    return await _delete<Payment>('payments', id)
  }

  const addPayment = async (payment: Payment): Promise<Payment> => {
    const { create } = useStrapi()
    return await create<Payment>('payments', payment)
  }

  const form = async (id: number): Promise<PaymentForm> => {
    return await client(`payments/${id}/form/`, { method: 'POST' })
  }

  const getRedsysFormWithoutCharge = async (): Promise<PaymentForm> => {
    return await client('payments/form/', { method: 'POST' })
  }
  return {
    addPayment,
    findPaymentsByUserId,
    deletePayment,
    form,
    getRedsysFormWithoutCharge,
  }
}
