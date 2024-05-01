export const useDeletePayment = () => {
    const executeDeletePayment = async (id: number): Promise<void> => {
        const { deletePayment } = usePaymentRepository();
        await deletePayment(id);
    }

    return {
        executeDeletePayment
    }
};
