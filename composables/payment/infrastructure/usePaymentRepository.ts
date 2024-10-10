import type { Payment } from '../domain/Payment.ts'

export const usePaymentRepository = () => {
  const findPaymentsByUserId = async (id: number): Promise<Payment[]> => {
    const { find } = useStrapi()
    return await find<Payment[]>('payments', { user: id })
  }
  const deletePayment = async (id: number): Promise<Payment> => {
    const { delete: _delete } = useStrapi()
    return await _delete<Payment>('payments', id)
  }

  const addPayment = async (payment: Payment): Promise<Payment> => {
    const { create } = useStrapi()
    return await create<Payment>('payments', payment)
  }

  return {
    addPayment,
    findPaymentsByUserId,
    deletePayment,
  }
}
