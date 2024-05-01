export const useDeletePaymentValidator = () => {
    const canDeletePayment = (payments: Payment[]) => {
        const MIN_PAYMENT_LIMIT: number = 1;
        return payments.length > MIN_PAYMENT_LIMIT
    };

    return {
        canDeletePayment
    };
}
