export const useDeletePaymentValidator = () => {
    const canDeletePayment = (payments: Payment[]) => {
        const min_payment_limit = 1
        return payments.length > min_payment_limit
    }

    return {
        canDeletePayment
    }
}
