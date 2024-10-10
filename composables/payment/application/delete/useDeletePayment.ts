export const useDeletePayment = () => {
  const { payments } = usePaymentState()
  const { deletePayment } = usePaymentRepository()
  const executeDeletePayment = async (id: number): Promise<void> => {
    const { canDeletePayment } = useDeletePaymentValidator()
    if (!canDeletePayment(payments.value)) {
      throw new Error('No puede borrar un pago si no tiene más de uno')
    }
    await deletePayment(id)
  }

  return {
    executeDeletePayment,
  }
}
