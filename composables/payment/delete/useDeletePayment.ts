export const useDeletePayment = () => {
    const executeDeletePayment = async (id: number): Promise<void> => {
        const { canDeletePayment } = useDeletePaymentValidator();
        const { paymentMethods } = await useGetPayment();
        if (!canDeletePayment(paymentMethods.value)) {
            throw new Error('No puede borrar un pago si no tiene más de uno');
        }
        const { deletePayment } = usePaymentRepository();
        await deletePayment(id);
    }

    return {
        executeDeletePayment
    }
};
