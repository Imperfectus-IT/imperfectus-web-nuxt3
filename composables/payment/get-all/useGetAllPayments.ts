export const useGetAllPayments = () => {
    const { payments } = usePaymentState();
    const { findPaymentsByUserId } = usePaymentRepository();

    const executeGetPaymentsFromUser = async (id: number) => {
        payments.value = await findPaymentsByUserId(id);
    };

    return {
        payments,
        executeGetPaymentsFromUser
    }
};