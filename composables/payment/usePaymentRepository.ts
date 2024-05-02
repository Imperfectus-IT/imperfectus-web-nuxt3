import type { Payment } from "./types/Payment.ts";

export const usePaymentRepository = () => {
    const findPaymentsByUserId = async (id: number): Promise<Payment[]> => {
        const { find } = useStrapi();
        return await find<Payment[]>('payments', {user: id});
    };
    const deletePayment = async (id: number): Promise<Payment> => {
        const { delete: _delete } = useStrapi();
        return await _delete<Payment>('payments', id);
    };

    return {
        findPaymentsByUserId,
        deletePayment
    };
};
